"use client";

import { useState } from "react";

type User = {
  name: string;
  email: string;
};

type Section = "overview" | "profile" | "work";
type IconName = "grid" | "user" | "layers" | "check" | "arrow" | "clock" | "spark";

const initialTasks = [
  { id: 1, title: "Review open pull requests", project: "Platform", done: false },
  { id: 2, title: "Fix flaky authentication test", project: "Platform", done: false },
  { id: 3, title: "Update API endpoint documentation", project: "Atlas", done: true },
  { id: 4, title: "Join daily engineering stand-up", project: "Team", done: false },
  { id: 5, title: "Implement dashboard empty state", project: "Internal tools", done: false },
  { id: 6, title: "Investigate production error logs", project: "Platform", done: false },
  { id: 7, title: "Write unit tests for user settings", project: "Atlas", done: false },
  { id: 8, title: "Pair with design on component behavior", project: "Design system", done: false },
  { id: 9, title: "Review sprint tickets and estimates", project: "Team", done: false },
  { id: 10, title: "Refactor duplicated form validation", project: "Internal tools", done: false },
  { id: 11, title: "Deploy staging build and verify changes", project: "Platform", done: false },
  { id: 12, title: "Share end-of-day progress update", project: "Team", done: false }
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></>
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
}

export function Workspace({
  user,
  onSignOut
}: {
  user: User;
  onSignOut: () => void;
}) {
  const [section, setSection] = useState<Section>("overview");
  const [tasks, setTasks] = useState(initialTasks);
  const firstName = user.name.trim().split(/\s+/)[0] || "there";
  const completedTasks = tasks.filter((task) => task.done).length;

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) => task.id === id ? { ...task, done: !task.done } : task)
    );
  }

  return (
    <div className="workspace">
      <aside className="sidebar">
        <a className="workspace-brand" href="#" onClick={(event) => { event.preventDefault(); setSection("overview"); }}>
          <span className="brand-mark">N</span>
          <span>northstar<span className="brand-dot">.</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Workspace navigation">
          <button className={`nav-item ${section === "overview" ? "is-active" : ""}`} onClick={() => setSection("overview")}>
            <Icon name="grid" /> <span>Overview</span>
          </button>
          <button className={`nav-item ${section === "work" ? "is-active" : ""}`} onClick={() => setSection("work")}>
            <Icon name="layers" /> <span>My work</span><span className="nav-count">{tasks.filter((task) => !task.done).length}</span>
          </button>
          <button className={`nav-item ${section === "profile" ? "is-active" : ""}`} onClick={() => setSection("profile")}>
            <Icon name="user" /> <span>My profile</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="team-card">
            <span className="team-avatar">E</span>
            <span><strong>Engineering</strong><small>Product team</small></span>
            <span className="team-status" aria-label="Team online" />
          </div>
          <button className="sidebar-user" onClick={() => setSection("profile")}>
            <span className="avatar avatar-small">{initials(user.name)}</span>
            <span className="sidebar-user-info"><strong>{user.name}</strong><small>Software Engineer</small></span>
            <span className="user-menu-dots" aria-hidden="true">···</span>
          </button>
        </div>
      </aside>

      <div className="workspace-main">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{section === "overview" ? "Overview" : section === "profile" ? "My profile" : "My work"}</strong></div>
          <div className="topbar-right">
            <span className="today-label"><span className="online-dot" /> All systems operational</span>
            <button className="topbar-avatar" aria-label="Open my profile" onClick={() => setSection("profile")}>{initials(user.name)}</button>
            <button className="sign-out-button" onClick={onSignOut}>Sign out</button>
          </div>
        </header>

        <main className="content-area">
          {section === "overview" && (
            <>
              <div className="welcome-row">
                <div>
                  <div className="date-kicker">MONDAY, OCTOBER 19</div>
                  <h1>Good morning, {firstName}<span className="wave">✳</span></h1>
                  <p className="welcome-subtitle">Here&apos;s what&apos;s happening across your workspace today.</p>
                </div>
                <button className="date-button"><Icon name="clock" size={16} /> This week <span className="chevron">⌄</span></button>
              </div>

              <section className="stat-grid" aria-label="Your week at a glance">
                <article className="stat-card">
                  <div className="stat-heading"><span>SPRINT PROGRESS</span><span className="stat-icon purple"><Icon name="spark" size={17} /></span></div>
                  <div className="stat-value">68<span className="stat-unit">%</span><span className="stat-trend">↗ 12%</span></div>
                  <div className="progress-track"><span style={{ width: "68%" }} /></div>
                  <div className="stat-footnote">17 of 25 story points completed</div>
                </article>
                <article className="stat-card">
                  <div className="stat-heading"><span>TASKS COMPLETED</span><span className="stat-icon green"><Icon name="check" size={17} /></span></div>
                  <div className="stat-value">{completedTasks}<span className="stat-unit"> / {tasks.length}</span><span className="stat-trend">this week</span></div>
                  <div className="mini-bars" aria-label="Weekly completion activity"><i /><i /><i /><i /><i /><i /><i /></div>
                  <div className="stat-footnote">You&apos;re building great momentum</div>
                </article>
                <article className="stat-card">
                  <div className="stat-heading"><span>ACTIVE PROJECTS</span><span className="stat-icon blue"><Icon name="layers" size={17} /></span></div>
                  <div className="stat-value">3<span className="stat-unit"> projects</span></div>
                  <div className="project-avatars"><span>A</span><span>I</span><span>P</span><small>+2 collaborators</small></div>
                  <div className="stat-footnote">Across 2 engineering teams</div>
                </article>
              </section>

              <section className="dashboard-grid">
                <article className="panel tasks-panel">
                  <div className="panel-header">
                    <div><div className="section-eyebrow">YOUR PRIORITIES</div><h2>My tasks <span className="heading-count">{tasks.filter((task) => !task.done).length}</span></h2></div>
                    <button className="text-button" onClick={() => setSection("work")}>View all <Icon name="arrow" size={15} /></button>
                  </div>
                  <div className="task-list">
                    {tasks.map((task) => (
                      <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}>
                        <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                        <span className="custom-check"><Icon name="check" size={13} /></span>
                        <span className="task-copy"><strong>{task.title}</strong><small>{task.project}</small></span>
                        <span className={`task-priority ${task.done ? "priority-done" : ""}`}>{task.done ? "Done" : task.id === 1 ? "High" : "In progress"}</span>
                      </label>
                    ))}
                  </div>
                  <button className="add-task-button" onClick={() => setSection("work")}><span>＋</span> Go to my work</button>
                </article>

                <article className="panel activity-panel">
                  <div className="panel-header">
                    <div><div className="section-eyebrow">THE LATEST</div><h2>Team activity</h2></div>
                    <button className="icon-button" aria-label="More activity options">···</button>
                  </div>
                  <div className="activity-list">
                    <div className="activity-row"><span className="activity-avatar activity-lilac">JM</span><p><strong>Jamie Morgan</strong> merged a pull request in <b>Atlas API</b><small>12 min ago · <span className="merged-tag">Merged</span></small></p></div>
                    <div className="activity-row"><span className="activity-avatar activity-peach">AL</span><p><strong>Alex Lee</strong> left a comment on <b>Design system v2</b><small>48 min ago · <span className="comment-quote">&quot;Looks great, shipping this!&quot;</span></small></p></div>
                    <div className="activity-row"><span className="activity-avatar activity-mint">SK</span><p><strong>Sam Kim</strong> completed <b>CI pipeline cleanup</b><small>2 hours ago · Platform</small></p></div>
                  </div>
                  <div className="activity-footer"><span className="online-dot" /> Your team is active <span className="footer-spacer" /> <span>See all →</span></div>
                </article>
              </section>

              <section className="panel projects-panel">
                <div className="panel-header">
                  <div><div className="section-eyebrow">IN FLIGHT</div><h2>Projects you&apos;re part of</h2></div>
                  <button className="text-button" onClick={() => setSection("work")}>Explore work <Icon name="arrow" size={15} /></button>
                </div>
                <div className="project-grid">
                  <div className="project-card"><div className="project-card-top"><span className="project-mark project-mark-violet">A</span><span className="project-status"><i /> On track</span></div><h3>Atlas platform</h3><p>Core APIs &amp; infrastructure</p><div className="project-progress"><span style={{ width: "74%" }} /></div><div className="project-card-bottom"><span>74% complete</span><span>Due Oct 30</span></div></div>
                  <div className="project-card"><div className="project-card-top"><span className="project-mark project-mark-coral">N</span><span className="project-status status-review"><i /> In review</span></div><h3>Northstar design system</h3><p>Components &amp; developer tools</p><div className="project-progress coral-progress"><span style={{ width: "48%" }} /></div><div className="project-card-bottom"><span>48% complete</span><span>Due Nov 04</span></div></div>
                  <div className="project-card"><div className="project-card-top"><span className="project-mark project-mark-blue">I</span><span className="project-status"><i /> On track</span></div><h3>Internal tools</h3><p>Better workflows for everyone</p><div className="project-progress blue-progress"><span style={{ width: "31%" }} /></div><div className="project-card-bottom"><span>31% complete</span><span>Due Nov 12</span></div></div>
                </div>
              </section>
            </>
          )}

          {section === "profile" && (
            <section className="profile-page">
              <div className="date-kicker">YOUR ACCOUNT</div>
              <h1>My profile</h1>
              <p className="welcome-subtitle">Your profile details and workspace membership.</p>
              <article className="panel profile-card">
                <div className="profile-cover" />
                <div className="profile-identity">
                  <span className="avatar avatar-large">{initials(user.name)}</span>
                  <div><h2>{user.name}</h2><p>Software Engineer <span className="profile-dot">·</span> Engineering</p></div>
                </div>
                <div className="profile-details">
                  <div><span className="profile-label">FULL NAME</span><strong>{user.name}</strong></div>
                  <div><span className="profile-label">WORK EMAIL</span><strong>{user.email}</strong></div>
                  <div><span className="profile-label">ROLE</span><strong>Software Engineer</strong></div>
                  <div><span className="profile-label">TEAM</span><strong>Engineering</strong></div>
                  <div><span className="profile-label">TIME ZONE</span><strong>Local time</strong></div>
                  <div><span className="profile-label">STATUS</span><strong className="profile-active"><i /> Active</strong></div>
                </div>
                <div className="profile-note"><Icon name="spark" size={17} /> Your profile is visible to members of the Engineering workspace.</div>
              </article>
            </section>
          )}

          {section === "work" && (
            <section className="work-page">
              <div className="date-kicker">STAY IN FLOW</div>
              <h1>My work</h1>
              <p className="welcome-subtitle">A focused view of the work on your plate.</p>
              <article className="panel work-list-panel">
                <div className="panel-header"><div><div className="section-eyebrow">THIS WEEK</div><h2>Tasks <span className="heading-count">{tasks.filter((task) => !task.done).length} open</span></h2></div><span className="work-date">Week of Oct 19</span></div>
                <div className="task-list">
                  {tasks.map((task) => (
                    <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}>
                      <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                      <span className="custom-check"><Icon name="check" size={13} /></span>
                      <span className="task-copy"><strong>{task.title}</strong><small>{task.project}</small></span>
                      <span className={`task-priority ${task.done ? "priority-done" : ""}`}>{task.done ? "Done" : task.id === 1 ? "High priority" : "In progress"}</span>
                    </label>
                  ))}
                </div>
              </article>
              <button className="back-link" onClick={() => setSection("overview")}>← Back to overview</button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
