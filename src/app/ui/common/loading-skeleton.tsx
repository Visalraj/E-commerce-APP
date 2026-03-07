export default function Skeleton() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center pt-24 px-6">
            <div
                role="status"
                className="relative overflow-hidden w-full max-w-5xl rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-16 border]">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

                {/* Image Skeleton - Softer corners and better aspect ratio */}
                <div className="w-full md:w-1/2 aspect-[4/3] bg-gray-100/80 rounded-[2rem] shrink-0 animate-pulse ring-1 ring-gray-200/50"></div>

                {/* Content Skeleton */}
                <div className="flex-1 flex flex-col justify-center py-6">
                    {/* Category Badge */}
                    <div className="h-6 bg-gray-100 rounded-full w-28 mb-8 animate-pulse"></div>

                    {/* Title - Multi-line and thicker */}
                    <div className="space-y-4 mb-10">
                        <div className="h-10 bg-gray-200/80 rounded-2xl w-full animate-pulse"></div>
                        <div className="h-10 bg-gray-200/80 rounded-2xl w-2/3 animate-pulse"></div>
                    </div>

                    {/* Subtle Price/Meta tag */}
                    <div className="h-8 bg-blue-50/50 rounded-xl w-32 mb-8 animate-pulse"></div>

                    {/* Description Lines - Varying widths and lighter color */}
                    <div className="space-y-3 mb-12">
                        <div className="h-3 bg-gray-100/60 rounded-full w-full animate-pulse"></div>
                        <div className="h-3 bg-gray-100/60 rounded-full w-full animate-pulse"></div>
                        <div className="h-3 bg-gray-100/60 rounded-full w-[90%] animate-pulse"></div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex gap-4 items-center">
                        {/* Primary Button */}
                        <div className="h-14 w-48 bg-gray-200/80 rounded-2xl animate-pulse"></div>
                        {/* Secondary Icon Button */}
                        <div className="h-14 w-14 bg-gray-100/80 rounded-2xl animate-pulse"></div>
                    </div>
                </div>

                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
