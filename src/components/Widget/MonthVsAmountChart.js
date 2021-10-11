import axios from "axios";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Spinner from "../Spinner";

function MonthVsAmountChart() {
  const [rawData, setRawData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const options = {
      url: "rest/analytics/monthAndAmount/ELECTRICITY",
      method: "GET",
    };

    console.log("chart: " + options);
    axios(options)
      .then((response) => {
        setRawData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Sorry, something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getChartData = () => {
    if (Object.keys(rawData).length !== 0) {
      var labelList = [];
      var valueList = [];

      Object.keys(rawData).forEach((key, i) => {
        labelList.push(key);
        valueList.push(rawData[key]);
      });

      const chartData = {
        labels: labelList,
        datasets: [
          {
            label: "MonthVsAmount",
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
