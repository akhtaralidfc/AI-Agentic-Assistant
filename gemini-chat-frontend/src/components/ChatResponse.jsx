// const ChatResponse=({ response })=>{
//     if(!response){
//         console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
//         return null;
//     }
//     const {candidates, usageMetadata}=response;
//     return(
//         <div className="container my-4">
//             <h3>Response</h3>
//             {candidates.map((candidate, index)=>(
//                 <div className="card mb-3" key={index}>
//                     <div className="card-body">
//                         <h5 className="card-title">Candidate {index+1}</h5>
//                         <p className="card-text">{candidate.content.parts[0].text}</p>
//                         <ul>
//                             {candidate?.citationMetadata?.citationMetadata.map((source,idx)=>(
//                                 <li key={idx}>
//                                     <a href={source.url} target="_blank" rel="noopener noreferrer">
//                                         {source.url}
//                                     </a> {" "}
//                                     (Indexes: {source.startIndex}-{source.endIndex})
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }
// export default ChatResponse;

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Helper to parse markdown-style code blocks
const renderFormattedText = (text) => {
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const [fullMatch, codeContent] = match;
    const matchStart = match.index;
    const matchEnd = match.index + fullMatch.length;

    // Push text before the code block
    if (matchStart > lastIndex) {
      segments.push(<p key={lastIndex}>{text.slice(lastIndex, matchStart)}</p>);
    }

    // Push code block
    segments.push(
    <SyntaxHighlighter key={matchStart + "-code"} language="javascript" style={oneDark}>
        {codeContent.trim()}
    </SyntaxHighlighter>
    );
    lastIndex = matchEnd;
  }

  // Push remaining text after the last code block
  if (lastIndex < text.length) {
    segments.push(<p key={lastIndex + "-end"}>{text.slice(lastIndex)}</p>);
  }

  return segments;
};

const ChatResponse = ({ response }) => {
  if (!response) return null;

  const { candidates, usageMetadata } = response;

  return (
    <div className="container my-4">
      <h3>Response</h3>
      {candidates.map((candidate, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">Candidate {index + 1}</h5>
            <div className="card-text">{renderFormattedText(candidate.content.parts[0].text)}</div>
            <ul>
              {candidate?.citationMetadata?.citationMetadata?.map((source, idx) => (
                <li key={idx}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.url}
                  </a>{" "}
                  (Indexes: {source.startIndex}-{source.endIndex})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatResponse;
