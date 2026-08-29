// import React from "react";

// /* ================= HELPERS ================= */

// function getInitials(name) {
//   if (!name) return "U";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();
// }

// function timeAgo(dateString) {
//   if (!dateString) return "";
//   const diffMs = Date.now() - new Date(dateString).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days === 1 ? "" : "s"} ago`;
// }

// const STATUS_LABELS = {
//   ACCEPTED: "Accepted",
//   REJECTED: "Rejected",
//   COMPLETED: "Completed",
// };

// /* ================= COMPONENT =================
//    Props:
//    - request: the request object ({ _id, recipient, bloodGroup, units,
//      city, reason, message, createdAt, status })
//    - onAccept(id) / onReject(id): called when the donor decides.
//      Only used while status === "PENDING".
//    - isBusy: disables the buttons while a decision is in flight. */

// export default function RequestCard({ request, onAccept, onReject, isBusy }) {
//   const recipient = request.recipient || {};
//   const isPending = request.status === "PENDING";

//   return (
//     <div className="dd-request-card">
//       <div className="dd-request-main">
//         <div className="dd-avatar">{getInitials(recipient.name)}</div>

//         <div className="dd-request-info">
//           <div className="dd-request-name">
//             {recipient.name || "Unknown Recipient"}
//           </div>

//           <div className="dd-request-meta">
//             <span className="dd-blood-group">{request.bloodGroup}</span>
//             {request.units && (
//               <>
//                 <span>•</span>
//                 <span>{request.units} Unit</span>
//               </>
//             )}
//             <span>•</span>
//             <span>{request.city}</span>
//           </div>

//           <div className="dd-request-reason">Reason: {request.reason}</div>

//           {request.message && (
//             <div className="dd-request-message">
//               Message: {request.message}
//             </div>
//           )}

//           <div className="dd-request-time">{timeAgo(request.createdAt)}</div>
//         </div>
//       </div>

//       {isPending ? (
//         <div className="dd-request-actions">
//           <button
//             className="dd-btn dd-btn--accept"
//             disabled={isBusy}
//             onClick={() => onAccept(request._id)}
//           >
//             {isBusy ? "..." : "Accept"}
//           </button>
//           <button
//             className="dd-btn dd-btn--reject"
//             disabled={isBusy}
//             onClick={() => onReject(request._id)}
//           >
//             {isBusy ? "..." : "Reject"}
//           </button>
//         </div>
//       ) : (
//         <span
//           className={`dd-status-badge dd-status-badge--${request.status.toLowerCase()}`}
//         >
//           {STATUS_LABELS[request.status] || request.status}
//         </span>
//       )}
//     </div>
//   );
// }





import React from "react";

/* ================= HELPERS ================= */

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(dateString) {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

const STATUS_LABELS = {
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
};

/* ================= COMPONENT =================
   Props:
   - request: the request object ({ _id, recipient, bloodGroup, units,
     city, reason, message, createdAt, status })
   - onAccept(id) / onReject(id): called when the donor decides.
     Only used while status === "PENDING".
   - isBusy: disables the buttons while a decision is in flight. */

export default function RequestCard({ request, onAccept, onReject, isBusy }) {
  const recipient = request.recipient || {};
  const normalizedStatus = (request.status || "").toUpperCase();
  const isPending = normalizedStatus === "PENDING";

  return (
    <div className="dd-request-card">
      <div className="dd-request-main">
        <div className="dd-avatar">{getInitials(recipient.name)}</div>

        <div className="dd-request-info">
          <div className="dd-request-name">
            {recipient.name || "Unknown Recipient"}
          </div>

          <div className="dd-request-meta">
            <span className="dd-blood-group">{request.bloodGroup}</span>
            {request.units && (
              <>
                <span>•</span>
                <span>{request.units} Unit</span>
              </>
            )}
            {request.city && (
              <>
                <span>•</span>
                <span>{request.city}</span>
              </>
            )}
          </div>

          {request.reason && (
            <div className="dd-request-reason">Reason: {request.reason}</div>
          )}

          {request.message && (
            <div className="dd-request-message">
              Message: {request.message}
            </div>
          )}

          <div className="dd-request-time">{timeAgo(request.createdAt)}</div>
        </div>
      </div>

      {isPending ? (
        <div className="dd-request-actions">
          <button
            className="dd-btn dd-btn--accept"
            disabled={isBusy}
            onClick={() => onAccept(request._id)}
          >
            {isBusy ? "..." : "Accept"}
          </button>
          <button
            className="dd-btn dd-btn--reject"
            disabled={isBusy}
            onClick={() => onReject(request._id)}
          >
            {isBusy ? "..." : "Reject"}
          </button>
        </div>
      ) : (
        <span
          className={`dd-status-badge dd-status-badge--${normalizedStatus.toLowerCase()}`}
        >
          {STATUS_LABELS[normalizedStatus] || request.status}
        </span>
      )}
    </div>
  );
}

