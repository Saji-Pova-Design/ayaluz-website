type CalendarCountdownProps = {
    days: number;
    hours: number;
    minutes: number;
  };
  
  export default function CalendarCountdown({
    days,
    hours,
    minutes,
  }: CalendarCountdownProps) {
    const items = [
      {
        label: "Days",
        value: days,
      },
      {
        label: "hrs",
        value: hours,
      },
      {
        label: "mins",
        value: minutes,
      },
    ];
  
    return (
      <div className="flex items-center gap-4">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center gap-4"
          >
            <div className="text-center">
              <div className="text-[34px] font-light leading-none text-[#111111]">
                {String(item.value).padStart(2, "0")}
              </div>
  
              <div className="mt-1 text-[13px] text-[#777777]">
                {item.label}
              </div>
            </div>
  
            {index < 2 && (
              <span className="text-[32px] font-light text-[#999999]">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }