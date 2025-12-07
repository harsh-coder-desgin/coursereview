import { Line } from "react-chartjs-2";

function RatingChart({rating,allrating}) {
    let name;
    if (rating === "Year") {
        name =["Jan", "Feb","Mar","Apr", "May","Jun", "Jul","Aug","Sept","Oct","Nov","Dec"]
    }else if(rating === "Week"){
         name =["1 day", "2 day", "3 day", "4 day", "5 day", "6 day", "7 day"]
    }else if(rating === "Month"){
        name =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
    }    
    const data = {
        labels: name,
        datasets: [
            {
                label: "Creator Rating",
                data: allrating || null,
                borderColor: "orange",        
                backgroundColor: "rgba(255,165,0,0.2)", 
                tension: 0.4,                   
                borderWidth: 2,
                pointBackgroundColor: "orange",
                pointRadius: 3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true, 
        plugins: {
            legend: {
                display: false,
                position: "top",
                labels: { color: "#333" },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, 
                },
            },
            y: {
                beginAtZero: true,
                max: 6,
                ticks: { stepSize: 1 },
                grid: {
                    display: false, 
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} width={300} height={189} />
        </div>
    );
}

export default RatingChart;
