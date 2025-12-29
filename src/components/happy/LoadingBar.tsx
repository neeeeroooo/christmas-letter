function LoadingBar({ progress, taps }: any) {
  return (
    <div className="space-y-3 text-center">
      <div className="w-full h-5 bg-white rounded-full overflow-hidden shadow">
        <div
          className="h-full bg-pink-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-600">
        {progress < 99
          ? `กำลังพาเดินทางไปยังงงงงง... ${progress}%`
          : `จิ้มรัว ๆ เลย!!!! ❤️`}
      </p>
    </div>
  );
}
export default LoadingBar;
