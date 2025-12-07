import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function OverReviewChart({monthlyreview}) {
  let ans=0
  if (monthlyreview.length > 0) {
    ans =  Math?.max(...monthlyreview)
  }
  console.log(ans);
  if (ans % 2 !=0) {
    ans +=18
   }else{
    ans +=20
   }
   console.log(ans);
   
  let number= ans 
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
  ],
    datasets: [
      {
        label: "Reviews per Month",
        data: monthlyreview || [0,0,0,0,0,0,0,0,0,0,0], 
        borderColor: "rgba(245, 199, 16, 1)",
        backgroundColor: "rgba(243, 208, 73, 0.45)",
        tension: 0.4, 
        borderWidth: 2,
        pointBackgroundColor: "yellow",
        pointRadius: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: monthlyreview.length > 0 ? "Monthly Reviews" : "No Data Yet",
        font:{ 
        size: 20,
        },
        padding: {
        top: 30,    
        bottom: 20, 
       },
      },
  
    },
    scales: {
      x: {
        grid: {
          display: true 
        },
      },
      y: {
        beginAtZero: true,
         max: number,
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "550px"}} className=" mt-12  ml-15">
      <Line data={data} options={options} />
    </div>
  );
}

export default OverReviewChart;
