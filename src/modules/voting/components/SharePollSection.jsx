import IconButton from "@components/IconButton";
import Input from "@components/Input";
import { copyTextToClipboard } from "@helper/copyToClipboard";
import { ClipboardIcon, ShareIcon } from "@heroicons/react/outline";
import React from "react";
import { toast } from "react-toastify";

const SharePollSection = ({ pollId }) => {
  return (
    <div className="mx-auto bg-[#1f2937] rounded divide-y divide-gray-700">
      <div className="flex items-center px-6 py-5 space-x-2">
        <ShareIcon className="w-5 h-5" />
        <div className="text-xl font-semibold">Share</div>
      </div>
      <div className="px-4 py-5">
        <div className="max-w-xl mx-auto space-y-1">
          <div className="text-sm font-medium">Poll link</div>
          <div className="flex">
            <Input
              type="text"
              readOnly
              value={`http://localhost:3000/poll/${pollId}`}
              className="rounded-r-none"
            />
            <IconButton
              onClick={() =>
                copyTextToClipboard(
                  `http://localhost:3000/poll/${pollId}`,
                  () => toast.success("Successfully copied!")
                )
              }
              icon={<ClipboardIcon className="w-4 h-4" />}
              className="px-4 bg-gray-600 rounded-l-none shadow-none"
            >
              Copy
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePollSection;
