import Widget from "../../components/Widget/Widget";
import MonthVsAmountChart from "../../components/Widget/MonthVsAmountChart";

function Dashboard(props) {
  return (
    <div>
      <h3>This is Dashboard</h3>
      <div className="container">
        <div className="row">
          <Widget user={props.user} />
          <MonthVsAmountChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
