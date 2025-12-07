function AllCreator() {
     const creators = [
    {
      id: 1,
      name: "Code with Harry",
      img:"/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
    {
      id: 2,
      name: "Code with Harry",
      img: "/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
    {
      id: 3,
      name: "Code with Harry",
      img: "/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
    {
      id: 4,
      name: "Code with Harry",
      img: "/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
      {
      id: 5,
      name: "Code with Harry",
      img: "/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
      {
      id: 6,
      name: "Code with Harry",
      img: "/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
      {
      id: 7,
      name: "Code with Harry",
      img: "/demoimg.png",
      desc: "A very simple page with HTML examples, attributes, and color names...",
    },
  ];
return (
  <div className="flex flex-col items-center bg-[#eef0ff] min-h-screen py-10">
    {/* Search Bar */}
    <div className="bg-white shadow-md rounded-md w-[300px] sm:w-[400px] lg:w-[500px] p-2 mb-10">
      <input
        type="text"
        placeholder="Search  creator"
        className="w-full outline-none text-gray-700 px-2"
      />
    </div>
    {/* Creator Cards (Grid Layout) */}
    <div
      className="grid grid-cols-5  gap-8 px-4 justify-items-center"
    >
      {creators.map((creator) => (
        <div
          key={creator.id}
          className="bg-white rounded-xl shadow-md overflow-hidden w-[220px] hover:shadow-lg transition-all"
        >
          <img
            src={creator.img}
            alt={creator.name}
            className="w-full h-60 object-cover"
          />
          <div className="p-3 text-center">
            <h2 className="font-semibold text-gray-800">{creator.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{creator.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default AllCreator
