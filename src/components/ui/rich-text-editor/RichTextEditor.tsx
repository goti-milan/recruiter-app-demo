import React, { useCallback, useRef, useState } from "react";

interface RichTextEditorProps {
  candidate_name: string;
  experience: string;
  skills: string;
  job_title?: string;
  company_name?: string;
  recruiter_name?: string;
  personalized_opening?: string;
  specific_skill?: string;
  value_proposition?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  candidate_name = "candidate_name",
  experience = "experience",
  skills = "skills",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const initialContent = `  <p>Hi ${candidate_name},</p>

    <p>[Personalized opening referencing their current role/company/experience]</p>

    <p>
        I came across your profile and was impressed by [specific skill/achievement].
        We have an exciting {job_title} opportunity at {company_name} that aligns perfectly
        with your ${skills}, ${experience} of experience.
    </p>

    <p>[Brief value proposition - why this role might interest them]</p>

    <p>
        Would love to connect and share more details about this {industry} role.
    </p>

    <p>Best regards,<br>
       {recruiter_name}<br>
       Saral AI
    </p>`;

  const saveToHistory = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(content);
        return newHistory.slice(-50);
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 49));
    }
  }, [historyIndex]);

  const handleCommand = useCallback(
    (command: string, value: any = null) => {
      if (editorRef.current) {
        editorRef.current.focus();

        if (command === "insertUnorderedList" || command === "insertOrderedList") {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            if (range.collapsed) {
              const startContainer = range.startContainer;
              let paragraph = startContainer.nodeType === Node.TEXT_NODE ? startContainer.parentElement : (startContainer as HTMLElement);

              while (paragraph && !["P", "DIV", "LI"].includes(paragraph.tagName) && paragraph !== editorRef.current) {
                paragraph = paragraph.parentElement;
              }

              if (paragraph && paragraph !== editorRef.current) {
                const newRange = document.createRange();
                newRange.selectNodeContents(paragraph);
                selection.removeAllRanges();
                selection.addRange(newRange);
              }
            }
          }

          document.execCommand(command, false, value);

          setTimeout(() => {
            if (editorRef.current) {
              const lists = editorRef.current.querySelectorAll("ul, ol");
              lists.forEach((list) => {
                if (list.tagName === "UL") {
                  (list as HTMLElement).style.listStyleType = "disc";
                } else if (list.tagName === "OL") {
                  (list as HTMLElement).style.listStyleType = "decimal";
                }

                const items = list.querySelectorAll("li");
                items.forEach((item) => {
                  if (!item.innerHTML.trim()) {
                    item.innerHTML = "<br>";
                  }
                  item.style.display = "list-item";
                });
              });
            }
          }, 10);
        } else {
          document.execCommand(command, false, value);
        }

        saveToHistory();
      }
    },
    [saveToHistory],
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0 && editorRef.current) {
      const newIndex = historyIndex - 1;
      editorRef.current.innerHTML = history[newIndex];
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1 && editorRef.current) {
      const newIndex = historyIndex + 1;
      editorRef.current.innerHTML = history[newIndex];
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            handleCommand("bold");
            break;
          case "i":
            e.preventDefault();
            handleCommand("italic");
            break;
          case "u":
            e.preventDefault();
            handleCommand("underline");
            break;
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case "l":
            e.preventDefault();
            handleCommand("insertUnorderedList");
            break;
          case "o":
            e.preventDefault();
            handleCommand("insertOrderedList");
            break;
        }
      }
    },
    [handleCommand, handleUndo, handleRedo],
  );

  const handleInput = useCallback(() => {
    saveToHistory();
  }, [saveToHistory]);

  const handleCopy = useCallback(() => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, []);

  React.useEffect(() => {
    if (editorRef.current && history.length === 0) {
      editorRef.current.innerHTML = initialContent;
      setHistory([initialContent]);
      setHistoryIndex(0);
    }
  }, [initialContent, history.length]);

  const isFormatActive = useCallback((command: string) => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  }, []);

  const isListActive = (type: "ul" | "ol") => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return false;

    let node = selection.anchorNode;
    while (node && node !== editorRef.current) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName.toLowerCase() === type) return true;
        if (element.tagName.toLowerCase() === "li") {
          const parent = element.parentElement;
          if (parent && parent.tagName.toLowerCase() === type) return true;
        }
      }
      node = node.parentNode;
    }
    return false;
  };

  return (
    <div className="w-130 max-w-2xl mx-8 bg-[#fffdfd] rounded-2xl border-[2px] border-[#ffffff] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-700 font-bold text-xl">L</span>
          </div>
          <div>
            <div className="text-base font-bold text-gray-900">Leslie A.</div>
            <div className="text-sm text-gray-500">Frontend Designer</div>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150"
          >
            <svg className="w-4 h-4 text-[#3D1562]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span className="text-sm font-medium text-[#3D1562]">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Custom Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-t mx-8 rounded-t-xl border-gray-100 bg-[#7517cc1f]">
        <div className="flex items-center space-x-4">
          {/* Undo/Redo */}
          <div className="flex items-center space-x-1">
            <button
              className={`p-1 hover:bg-gray-100 rounded transition-colors duration-150 ${
                historyIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Undo"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.5 10.25H8.88438L11.1263 8.00875L10.25 7.125L6.5 10.875L10.25 14.625L11.1263 13.7406L8.88625 11.5H16.5C17.4946 11.5 18.4484 11.8951 19.1517 12.5983C19.8549 13.3016 20.25 14.2554 20.25 15.25C20.25 16.2446 19.8549 17.1984 19.1517 17.9017C18.4484 18.6049 17.4946 19 16.5 19H11.5V20.25H16.5C17.8261 20.25 19.0979 19.7232 20.0355 18.7855C20.9732 17.8479 21.5 16.5761 21.5 15.25C21.5 13.9239 20.9732 12.6521 20.0355 11.7145C19.0979 10.7768 17.8261 10.25 16.5 10.25Z"
                  fill="#3D1562"
                />
              </svg>
            </button>
            <button
              className={`p-1 hover:bg-gray-100 rounded transition-colors duration-150 ${
                historyIndex >= history.length - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Redo"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5 10.25H19.1156L16.8737 8.00875L17.75 7.125L21.5 10.875L17.75 14.625L16.8737 13.7406L19.1137 11.5H11.5C10.5054 11.5 9.55161 11.8951 8.84835 12.5983C8.14509 13.3016 7.75 14.2554 7.75 15.25C7.75 16.2446 8.14509 17.1984 8.84835 17.9017C9.55161 18.6049 10.5054 19 11.5 19H16.5V20.25H11.5C10.1739 20.25 8.90215 19.7232 7.96447 18.7855C7.02678 17.8479 6.5 16.5761 6.5 15.25C6.5 13.9239 7.02678 12.6521 7.96447 11.7145C8.90215 10.7768 10.1739 10.25 11.5 10.25V10.25Z"
                  fill="#3D1562"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-gray-300"></div>

          {/* Text Formatting */}
          <div className="flex items-center space-x-1">
            <button
              className={`px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150 font-bold text-lg ${
                isFormatActive("bold") ? "bg-gray-200 text-gray-900" : "text-gray-700"
              }`}
              title="Bold"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleCommand("bold")}
            >
              B
            </button>
            <button
              className={`px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150 italic text-lg ${
                isFormatActive("italic") ? "bg-gray-200" : "text-gray-700"
              }`}
              title="Italic"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleCommand("italic")}
            >
              I
            </button>
            <button
              className={`px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150 underline text-lg ${
                isFormatActive("underline") ? "bg-gray-200" : "text-gray-700"
              }`}
              title="Underline"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleCommand("underline")}
            >
              U
            </button>
          </div>
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1">
          <button
            className={`p-1 hover:bg-gray-100 rounded transition-colors duration-150 ${isListActive("ul") ? "bg-gray-200" : ""}`}
            title="Bullet List (Ctrl+L)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleCommand("insertUnorderedList")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.375 7.5C5.41053 7.5 6.25 6.66053 6.25 5.625C6.25 4.58947 5.41053 3.75 4.375 3.75C3.33947 3.75 2.5 4.58947 2.5 5.625C2.5 6.66053 3.33947 7.5 4.375 7.5Z"
                fill="#3D1562"
              />
              <path
                d="M4.375 16.25C5.41053 16.25 6.25 15.4105 6.25 14.375C6.25 13.3395 5.41053 12.5 4.375 12.5C3.33947 12.5 2.5 13.3395 2.5 14.375C2.5 15.4105 3.33947 16.25 4.375 16.25Z"
                fill="#3D1562"
              />
              <path d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5Z" fill="#3D1562" />
            </svg>
          </button>
          <button
            className={`p-1 hover:bg-gray-100 rounded transition-colors duration-150 ${isListActive("ol") ? "bg-gray-200" : ""}`}
            title="Numbered List (Ctrl+O)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleCommand("insertOrderedList")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5ZM5 7.5V2.5H3.75V3.125H2.5V4.375H3.75V7.5H2.5V8.75H6.25V7.5H5ZM6.25 17.5H2.5V15C2.5 14.6685 2.6317 14.3505 2.86612 14.1161C3.10054 13.8817 3.41848 13.75 3.75 13.75H5V12.5H2.5V11.25H5C5.33152 11.25 5.64946 11.3817 5.88388 11.6161C6.1183 11.8505 6.25 12.1685 6.25 12.5V13.75C6.25 14.0815 6.1183 14.3995 5.88388 14.6339C5.64946 14.8683 5.33152 15 5 15H3.75V16.25H6.25V17.5Z"
                fill="#3D1562"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative bg-[#7517cc1f] mx-8">
        <div
          ref={editorRef}
          contentEditable
          className="h-50 px-6 py-4 text-sm leading-relaxed text-gray-700 focus:outline-none editor-content overflow-y-auto"
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          suppressContentEditableWarning={true}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end space-x-3 px-6 py-4 rounded-b-xl border-t border-gray-100 mx-8 mb-8  bg-[#7517cc1f]">
        <button className="px-6 py-2 text-sm text-[#3F1562] bg-[#fafafa]  border-[2px] border-[#3F1562] hover:bg-purple-100 transition-colors duration-150 rounded-lg hover:border-gray-300">
          Cancel
        </button>
        <button className="px-6 py-2 bg-white hover:bg-[#3F1562] hover:text-white border-[#3F1562] text-[#3F1562] text-sm rounded-lg transition-colors duration-150 font-medium">
          Done
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .editor-content {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .editor-content p {
          margin-bottom: 0.5rem;
        }
        .editor-content p:last-child {
          margin-bottom: 0;
        }
        .editor-content strong {
          font-weight: 600;
        }
        .editor-content em {
          font-style: italic;
        }
        .editor-content u {
          text-decoration: underline;
        }
        .editor-content ul, .editor-content ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          list-style-position: outside;
        }
        .editor-content ul {
          list-style-type: disc;
        }
        .editor-content ol {
          list-style-type: decimal;
        }
        .editor-content li {
          margin: 0.25rem 0;
          display: list-item;
          list-style-position: outside;
        }
        .editor-content ul li {
          list-style-type: disc;
        }
        .editor-content ol li {
          list-style-type: decimal;
        }
        .editor-content br {
          line-height: 1.5;
        }
      `,
        }}
      />
    </div>
  );
};

export default RichTextEditor;
