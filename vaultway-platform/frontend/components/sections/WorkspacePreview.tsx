export default function WorkspacePreview() {
  return (
    <section className="vw-workspace">
      <div className="vw-workspace-copy">
        <span className="eyebrow">The workspace</span>
        <h2 className="h-sec">Your files, organized and armored</h2>
        <p className="lead">
          Search your drive, watch the 5 GB quota, and review recent uploads,
          shares, and folder changes from one dashboard.
        </p>
      </div>

      <div className="vw-workspace-frame">
        <div className="win-bar">
          <span className="win-dot r"></span>
          <span className="win-dot y"></span>
          <span className="win-dot g"></span>
          <span className="win-url">app.vaultway.io/dashboard</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/workspace-dashboard.png"
          alt="Vaultway dashboard showing the cloud drive"
          className="vw-workspace-shot"
        />
      </div>
    </section>
  );
}
