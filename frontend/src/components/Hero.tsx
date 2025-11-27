export default function Hero() {
  return (
    <div className="container flex flex-col">
      <div className="relative flex flex-col items-center overflow-hidden rounded-4xl bg-[url('@/assets/img/banner.jpg')] bg-cover bg-center bg-no-repeat px-10 pt-16 pb-28">
        <div className="absolute inset-0 z-0 bg-black/30"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl leading-14 font-semibold text-white">
            Book Your Stay With BookHub
          </h1>
          <p className="mt-2 text-xl text-white">The Best Plans Start with One Click. Book Now.</p>
        </div>
      </div>
    </div>
  )
}
