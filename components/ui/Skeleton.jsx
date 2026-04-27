export function SkeletonCard() {
  return (
    <div className="sk-card">
      <div className="sk-card__img" />
      <div className="sk-card__body">
        <div className="sk-bar" style={{ width: "75%" }} />
        <div className="sk-bar sk-bar--sm" style={{ width: "50%" }} />
        <div className="sk-card__row">
          <div className="sk-bar sk-bar--sm" style={{ width: "4rem" }} />
          <div className="sk-bar sk-bar--sm" style={{ width: "4rem" }} />
          <div className="sk-bar sk-bar--sm" style={{ width: "4rem" }} />
        </div>
        <div className="sk-bar sk-bar--lg" style={{ width: "33%" }} />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`sk-text-stack${className ? ` ${className}` : ""}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="sk-text-line"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonList({ count = 5 }) {
  return (
    <div className="sk-list">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="sk-list-item" />
      ))}
    </div>
  );
}

export default function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`sk-base sk-bg${className ? ` ${className}` : ""}`}
      style={style}
    />
  );
}
