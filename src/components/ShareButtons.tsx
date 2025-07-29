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
    <div className="mt-8 pt-4">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Share:</span>
        
        {/* X (Twitter) */}
        <TwitterShareButton url={url} title={title}>
          <div className="p-1 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all duration-200 hover:scale-110" title="X でシェア">
            <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
          </div>
        </TwitterShareButton>

        {/* Facebook */}
        <FacebookShareButton url={url}>
          <div className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110" title="Facebook でシェア">
            <FacebookIcon size={24} round />
          </div>
        </FacebookShareButton>

        {/* はてなブックマーク */}
        <button
          onClick={handleHatenaShare}
          className="p-1 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
          aria-label="はてなブックマークでシェア"
          title="はてなブックマーク でシェア"
        >
          <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">B!</span>
          </div>
        </button>

        {/* LINE */}
        <LineShareButton url={url} title={title}>
          <div className="p-1 text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-all duration-200 hover:scale-110" title="LINE でシェア">
            <LineIcon size={24} round />
          </div>
        </LineShareButton>

        {/* リンクコピー */}
        <button
          onClick={handleCopyLink}
          className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110"
          aria-label="リンクをコピー"
          title={copied ? 'コピー済み!' : 'リンクをコピー'}
        >
          <svg
            className="w-6 h-6"
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
        </button>
      </div>
    </div>
  );
}