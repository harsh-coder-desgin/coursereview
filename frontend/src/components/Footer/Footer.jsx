function Footer() {
  return (
<footer className="bg-white text-black border-t border-b border-[#DEDEDE]">
  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between">

    {/* Left Section: Logo + Copyright */}
    <div className="flex flex-col items-center md:items-start space-y-4">
      <img
        src="/logoreview.png"
        alt="Logo"
        className="h-16 w-16 object-contain"
      />
      <p className="text-sm text-gray-600 mt-23">© 2025. All rights reserved.</p>
    </div>

    {/* Right Section: About Us */}
    <div className="text-center md:text-left mt-6 md:mt-0 max-w-md">
      <h3 className="text-[25px] font-semibold mb-2 mt-2 ml-74 mb-5">About Us</h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 mt-7 ml-4">
       We empower learners to make confident decisions by providing trusted course reviews, genuine student feedback and carefully curated learning recommendations.
      </p>

      {/* Social Icons (as images) */}
      <div className="flex justify-end space-x-2 mr-9">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/linkedin.png"
            alt="LinkedIn"
            className="h-9 w-10 hover:opacity-80 transition"
          />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/github.png"
            alt="GitHub"
            className="h-9 w-10 hover:opacity-80 transition"
          />
        </a>
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer
