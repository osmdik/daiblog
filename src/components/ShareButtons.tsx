import { useState } from 'react';
import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
} from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleHatenaShare = () => {
    const hatenaUrl = `https://b.hatena.ne.jp/entry/panel/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(hatenaUrl, '_blank', 'width=500,height=500');
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        📤 この記事をシェア
      </h3>
      <div className="flex flex-wrap gap-3">
        {/* Twitter */}
        <TwitterShareButton url={url} title={title}>
          <div className="flex items-center gap-2 px-3 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors group">
            <TwitterIcon size={20} round />
            <span className="text-sm font-medium">Twitter</span>
          </div>
        </TwitterShareButton>

        {/* Facebook */}
        <FacebookShareButton url={url}>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group">
            <FacebookIcon size={20} round />
            <span className="text-sm font-medium">Facebook</span>
          </div>
        </FacebookShareButton>

        {/* はてなブックマーク */}
        <button
          onClick={handleHatenaShare}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          aria-label="はてなブックマークでシェア"
        >
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 text-xs font-bold">B!</span>
          </div>
          <span className="text-sm font-medium">はてブ</span>
        </button>

        {/* LINE */}
        <LineShareButton url={url} title={title}>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors group">
            <LineIcon size={20} round />
            <span className="text-sm font-medium">LINE</span>
          </div>
        </LineShareButton>

        {/* リンクコピー */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
          aria-label="リンクをコピー"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium">
            {copied ? 'コピー済み!' : 'リンクコピー'}
          </span>
        </button>
      </div>
    </div>
  );
}