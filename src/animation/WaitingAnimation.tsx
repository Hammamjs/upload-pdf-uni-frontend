const WaitingAnimation = () => {
  return (
    <div className="flex justify-center w-full h-[calc(100vh-130px)] items-center gap-1">
      <p className="w-3 h-3 rounded-full bg-gray-600 animate-[bounce_2s_0.5s_ease-in-out_infinite] transition-transform"></p>
      <p className="w-3 h-3 rounded-full bg-gray-600 animate-[bounce_2s_1s_ease-in-out_infinite] "></p>
      <p className="w-3 h-3 rounded-full bg-gray-600 animate-[bounce_2s_1.5s_ease-in-out_infinite] "></p>
    </div>
  );
};

export default WaitingAnimation;
