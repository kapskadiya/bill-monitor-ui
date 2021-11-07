import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Spinner from "../Spinner/Spinner";

function MonthVsAmountChart() {
  const rendered = useRef(false);
  const [rawData, setRawData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    return () => {
      rendered.current = true;
    };
  }, []);

  async function fetchData() {
    const options = {
      url: "rest/analytics/amountAndTime",
      method: "POST",
      data: {
        billType: "electricity",
        timeIn: "month",
      },
    };

    axios(options)
      .then((response) => {
        if (!rendered.current) {
          setRawData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage("Sorry, something went wrong.");
      });
    setIsLoading(false);
  }

  const getChartData = () => {
    if (Object.keys(rawData).length !== 0) {
      var labelList = [];
      var valueList = [];

      Object.keys(rawData).forEach((key, i) => {
        labelList.push(rawData[key].xValue);
        valueList.push(rawData[key].yValue);
      });

      const chartData = {
        labels: labelList,
        datasets: [
          {
            label: "#amount",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: valueList,
          },
        ],
      };

      return chartData;
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="col">
        {errorMessage && (
          <p className="alert alert-danger" role="alert">
            {errorMessage}
          </p>
        )}
        <Bar data={getChartData()} />
      </div>
    );
  }
}

export default MonthVsAmountChart;
