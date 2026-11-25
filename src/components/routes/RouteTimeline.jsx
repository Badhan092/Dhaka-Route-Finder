export default function RouteTimeline({ stops = [] }) {
  return (
    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
      {stops.map((stop, index) => {
        const isStart = index === 0;
        const isEnd = index === stops.length - 1;

        return (
          <div key={index} className="relative flex items-start gap-4">
            <div
              className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white ${
                isStart
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : isEnd
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isStart || isEnd ? 'bg-white' : 'bg-slate-400'
                }`}
              />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isStart || isEnd
                    ? 'font-bold text-slate-900 text-sm'
                    : 'font-medium text-slate-700'
                }`}
              >
                {stop}
                {isStart && (
                  <span className="ml-2 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    Boarding Point
                  </span>
                )}
                {isEnd && (
                  <span className="ml-2 text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full uppercase">
                    Destination
                  </span>
                )}
              </p>
              <p className="text-[11px] text-slate-400">Stop #{index + 1}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
