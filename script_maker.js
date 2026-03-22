let projectCount = 0;
let linkCount = 0;

function updateStepper(n) {
  const map = {1:1, 2:2, 3:3, 'done':4};
  const cur = map[n] || 1;
  [1,2,3].forEach(i => {
    const node = document.getElementById('sn-'+i);
    const line = document.getElementById('sl-'+i);
    node.classList.remove('active','done');
    if(line) line.classList.remove('done');
    if(i < cur){ node.classList.add('done'); if(line) line.classList.add('done'); }
    else if(i === cur){ node.classList.add('active'); }
  });
  const doneNode = document.getElementById('sn-done');
  doneNode.classList.remove('active','done');
  if(cur === 4) doneNode.classList.add('active');
}

function goTo(n) {
  if (typeof n === 'number' && n > 1) {
    if (n === 2 && !validate(1)) return;
    if (n === 3 && !validate(2)) return;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = (n === 'done') ? 'page-done' : 'page-' + n;
  document.getElementById(target).classList.add('active');
  updateStepper(n);
  window.scrollTo(0, 0);
}

function getOS() {
  return document.querySelector('input[name="os"]:checked').value;
}

document.getElementById('f-show-api').addEventListener('change', function() {
  document.getElementById('api-block').style.display = this.checked ? 'block' : 'none';
});

function updateZipPreview() {
  const prefix = document.getElementById('f-zipname').value.trim().replace(/\s+/g,'-') || 'my-portfolio';
  const ver = document.getElementById('f-version').value.trim() || '1.0.0';
  document.getElementById('zip-preview-box').textContent = prefix + '-v' + ver + '-by-muaves.zip';
}
updateZipPreview();

document.getElementById('f-version').addEventListener('input', updateZipPreview);

function addProject() {
  if (projectCount >= 10) return;
  projectCount++;
  const i = projectCount;
  const div = document.createElement('div');
  div.id = 'project-' + i;
  div.className = 'project-item';
  div.dataset.idx = i;
  div.innerHTML =
    '<h3>Project ' + i + ' <button type="button" class="btn-remove" onclick="removeItem(\'project-\'+' + i + ')">Remove</button></h3>' +
    '<div class="field"><label>Name *</label><input type="text" id="p-name-' + i + '" placeholder="Project name"></div>' +
    '<div class="field"><label>Description</label><textarea id="p-desc-' + i + '" rows="2" placeholder="What does it do?"></textarea></div>' +
    '<div class="field"><label>URL</label><input type="text" id="p-url-' + i + '" placeholder="https://github.com/you/project"></div>' +
    '<div class="field"><label>Tech stack</label><input type="text" id="p-tech-' + i + '" placeholder="Python, Bash, etc."></div>';
  document.getElementById('projects-list').appendChild(div);
}

function addLink() {
  linkCount++;
  const i = linkCount;
  const div = document.createElement('div');
  div.id = 'link-' + i;
  div.className = 'link-item';
  div.innerHTML =
    '<h3>Link ' + i + ' <button type="button" class="btn-remove" onclick="removeItem(\'link-\'+' + i + ')">Remove</button></h3>' +
    '<div class="field"><label>Label *</label><input type="text" id="l-label-' + i + '" placeholder="e.g. Twitter"></div>' +
    '<div class="field"><label>URL *</label><input type="text" id="l-url-' + i + '" placeholder="https://twitter.com/you"></div>';
  document.getElementById('links-list').appendChild(div);
}

function removeItem(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function collectProjects() {
  const items = document.querySelectorAll('#projects-list [id^="project-"]');
  const out = [];
  items.forEach(div => {
    const i = div.dataset.idx;
    const name = val('p-name-' + i);
    if (!name) return;
    out.push({
      name,
      desc: val('p-desc-' + i),
      url: val('p-url-' + i),
      tech: val('p-tech-' + i)
    });
  });
  return out;
}

function collectLinks() {
  const items = document.querySelectorAll('#links-list [id^="link-"]');
  const out = [];
  items.forEach(div => {
    const i = div.id.replace('link-','');
    const label = val('l-label-' + i);
    const url = val('l-url-' + i);
    if (label && url) out.push({ label, url });
  });
  return out;
}

function validate(page) {
  if (page === 1) {
    if (!val('f-name')) { alert('Please enter your name.'); return false; }
    if (!val('f-username')) { alert('Please enter a CLI command name.'); return false; }
    const cmd = val('f-username');
    if (/\s/.test(cmd)) { alert('Command name cannot contain spaces.'); return false; }
    if (!val('f-bio')) { alert('Please enter a bio.'); return false; }
  }
  if (page === 2) {
    const projs = collectProjects();
    if (projs.length === 0) { alert('Please add at least 1 project.'); return false; }
  }
  return true;
}


function reset() {
  projectCount = 0;
  linkCount = 0;
  document.getElementById('projects-list').innerHTML = '';
  document.getElementById('links-list').innerHTML = '';
  document.getElementById('f-name').value = '';
  document.getElementById('f-username').value = '';
  document.getElementById('f-title').value = '';
  document.getElementById('f-bio').value = '';
  document.getElementById('f-website').value = '';
  document.getElementById('f-github').value = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-location').value = '';
  document.getElementById('f-version').value = '1.0.0';
  document.getElementById('f-zipname').value = '';
  updateZipPreview();
}

function buildPortfolioData(data) {
  return JSON.stringify(data, null, 2);
}

function buildPythonScript(data, color) {
  const cmd = data.username;
  const ver = data.version;
  const apiEnabled = data.apiUrl ? 'True' : 'False';
  const apiUrl = data.apiUrl || '';

  return `import sys
import json
import os
import subprocess
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(SCRIPT_DIR, "portfolio_data.json")
VERSION = "${ver}"
ACCENT = "${color}"
API_URL = "${apiUrl}"
API_ENABLED = ${apiEnabled}

def c(text, code=ACCENT, bold=False):
    b = "\\033[1m" if bold else ""
    return f"\\033[{code}m{b}{text}\\033[0m"

def load_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def fetch_api(endpoint):
    try:
        url = API_URL.rstrip("/") + "/" + endpoint
        req = urllib.request.Request(url, headers={"User-Agent": "muavescli-portfolio"})
        with urllib.request.urlopen(req, timeout=5) as r:
            return json.loads(r.read().decode())
    except Exception:
        return None

def show_banner(name):
    print("")
    print(c("  " + "═" * (len(name) + 14), "37"))
    print(c("  ║  " + name + " — Portfolio  ║", ACCENT, bold=True))
    print(c("  " + "═" * (len(name) + 14), "37"))
    print(c("  Made with muavescli by Muaves (muaves.com)", "90"))
    print("")

def show_help(data):
    show_banner(data["name"])
    print(c("  Usage:", ACCENT, bold=True))
    print("")
    print(f"  {c('${cmd}', ACCENT)}              Show this help")
    print(f"  {c('${cmd} -oA', ACCENT)}           About me")
    print(f"  {c('${cmd} -oP', ACCENT)}           My projects")
    print(f"  {c('${cmd} -oH', ACCENT)}           Help")
    print(f"  {c('${cmd} -OW', ACCENT)}           Open website in browser")
    print(f"  {c('${cmd} -H:l', ACCENT)}          Show links")
    print(f"  {c('${cmd} --version', ACCENT)}      Show version")
    print(f"  {c('${cmd} --v', ACCENT)}            Show version")
    print("")
    print(c("  Portfolio generated by muavescli — muaves.com", "90"))
    print("")

def show_about(data):
    if API_ENABLED:
        remote = fetch_api("about")
        if remote:
            data["about"] = remote
    show_banner(data["name"])
    about = data.get("about", {})
    name = about.get("name", data.get("name", ""))
    title = about.get("title", data.get("title", ""))
    bio = about.get("bio", data.get("bio", ""))
    website = about.get("website", data.get("website", ""))
    github = about.get("github", data.get("github", ""))
    email = about.get("email", data.get("email", ""))
    location = about.get("location", data.get("location", ""))
    if name: print(f"  {c('Name', ACCENT)}      {name}")
    if title: print(f"  {c('Title', ACCENT)}     {title}")
    if bio:
        print(f"  {c('Bio', ACCENT)}       {bio}")
    if location: print(f"  {c('Location', ACCENT)}  {location}")
    if website: print(f"  {c('Website', ACCENT)}   {website}")
    if github: print(f"  {c('GitHub', ACCENT)}    {github}")
    if email: print(f"  {c('Email', ACCENT)}     {email}")
    print("")
    print(c("  Made with muavescli by Muaves — muaves.com", "90"))
    print("")

def show_projects(data):
    if API_ENABLED:
        remote = fetch_api("projects")
        if remote:
            data["projects"] = remote if isinstance(remote, list) else remote.get("projects", data["projects"])
    show_banner(data["name"])
    projects = data.get("projects", [])
    if not projects:
        print(c("  No projects found.", "33"))
        print("")
        return
    for i, p in enumerate(projects, 1):
        name = p.get("name", "Unnamed")
        desc = p.get("desc", p.get("description", ""))
        url = p.get("url", "")
        tech = p.get("tech", "")
        print(f"  {c(str(i) + '.', '37')} {c(name, ACCENT, bold=True)}")
        if desc: print(f"     {desc}")
        if tech: print(f"     {c('Stack:', '37')} {tech}")
        if url: print(f"     {c(url, '36')}")
        print("")
    print(c("  Made with muavescli by Muaves — muaves.com", "90"))
    print("")

def show_links(data):
    if API_ENABLED:
        remote = fetch_api("links")
        if remote:
            data["links"] = remote if isinstance(remote, list) else remote.get("links", data["links"])
    show_banner(data["name"])
    links = data.get("links", [])
    if not links:
        print(c("  No links found.", "33"))
        print("")
        return
    for i, lnk in enumerate(links, 1):
        label = lnk.get("label", lnk.get("name", "Link"))
        url = lnk.get("url", lnk.get("href", ""))
        print(f"  {c(str(i) + '.', '37')} {c(label, ACCENT)}  →  {c(url, '36')}")
    print("")
    choice = input(c("  Enter number to open in browser (or Enter to skip): ", "37")).strip()
    if choice.isdigit():
        idx = int(choice) - 1
        if 0 <= idx < len(links):
            url = links[idx].get("url", links[idx].get("href", ""))
            try:
                if sys.platform == "win32":
                    os.startfile(url)
                elif sys.platform == "darwin":
                    subprocess.Popen(["open", url])
                else:
                    subprocess.Popen(["xdg-open", url])
                print(c("  Opening " + url + "...", "36"))
            except Exception as e:
                print(c("  Could not open browser: " + str(e), "31"))
    print("")
    print(c("  Made with muavescli by Muaves — muaves.com", "90"))
    print("")

def open_website(data):
    url = data.get("website", "")
    if not url:
        print(c("  No website set.", "33"))
        return
    try:
        if sys.platform == "win32":
            os.startfile(url)
        elif sys.platform == "darwin":
            subprocess.Popen(["open", url])
        else:
            subprocess.Popen(["xdg-open", url])
        print(c("  Opening " + url + "...", "36"))
    except Exception as e:
        print(c("  Could not open browser: " + str(e), "31"))

def show_version():
    print("")
    print(c("  ${cmd} v" + VERSION, ACCENT, bold=True))
    print(c("  Made with muavescli by Muaves — muaves.com", "90"))
    print("")

def main():
    data = load_data()
    args = sys.argv[1:]
    if not args:
        show_help(data)
    else:
        a = args[0].lower()
        if a in ("-oa",):
            show_about(data)
        elif a in ("-op",):
            show_projects(data)
        elif a in ("-oh", "-h"):
            show_help(data)
        elif a in ("-ow",):
            open_website(data)
        elif a in ("-h:l",):
            show_links(data)
        elif a in ("--version", "--v"):
            show_version()
        else:
            print(c("  Unknown command: " + args[0], "31"))
            show_help(data)

if __name__ == "__main__":
    main()
`;
}

function buildLinuxLauncher(cmd) {
  return `#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
python3 "$SCRIPT_DIR/portfolio.py" "$@"
`;
}

function buildLinuxInstaller(cmd) {
  return `#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Installing ${cmd}..."
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"
cp "$SCRIPT_DIR/portfolio.py" "$INSTALL_DIR/${cmd}.py"
cp "$SCRIPT_DIR/portfolio_data.json" "$INSTALL_DIR/portfolio_data.json"
cat > "$INSTALL_DIR/${cmd}" << LAUNCHER
#!/usr/bin/env bash
python3 "$INSTALL_DIR/${cmd}.py" "\\$@"
LAUNCHER
chmod +x "$INSTALL_DIR/${cmd}"
echo ""
echo "Installed! Run: ${cmd}"
echo "If command not found, add ~/.local/bin to your PATH:"
echo "  echo 'export PATH=\\$HOME/.local/bin:\\$PATH' >> ~/.bashrc && source ~/.bashrc"
echo ""
echo "Portfolio made with muavescli by Muaves — muaves.com"
echo ""
`;
}

function buildWindowsBat(cmd) {
  return `@echo off
set "SCRIPT_DIR=%~dp0"
python "%SCRIPT_DIR%portfolio.py" %*
`;
}

function buildWindowsInstaller(cmd) {
  return `@echo off
echo Installing ${cmd}...
echo.
echo This installer sets up ${cmd} to be used from anywhere.
echo.
set "INSTALL_DIR=%USERPROFILE%\\${cmd}-portfolio"
mkdir "%INSTALL_DIR%" 2>nul
copy /Y "%~dp0portfolio.py" "%INSTALL_DIR%\\portfolio.py" >nul
copy /Y "%~dp0portfolio_data.json" "%INSTALL_DIR%\\portfolio_data.json" >nul
(
  echo @echo off
  echo python "%INSTALL_DIR%\\portfolio.py" %%*
) > "%INSTALL_DIR%\\${cmd}.bat"
setx PATH "%PATH%;%INSTALL_DIR%" >nul 2>&1
echo.
echo Installed! Restart your terminal and run: ${cmd}
echo.
echo Portfolio made with muavescli by Muaves -- muaves.com
echo.
pause
`;
}

function buildReadme(data, os) {
  const cmd = data.username;
  const winBlock = `### Windows\n1. Extract the ZIP\n2. Open Command Prompt or PowerShell\n3. Run \`${cmd}.bat\`\n4. To install globally, run \`install.bat\``;
  const linBlock = `### Linux / macOS\n1. Extract the ZIP\n2. Open terminal, navigate to the folder\n3. Run \`chmod +x ${cmd} && ./${cmd}\`\n4. To install globally, run \`./install.sh\``;

  let installSection = '';
  if (os === 'both') installSection = winBlock + '\n\n' + linBlock;
  else if (os === 'windows') installSection = winBlock;
  else installSection = linBlock;

  return `# ${data.name} — CLI Portfolio
> Made with muavescli by Muaves — muaves.com

## Quick Start

${installSection}

## Commands

\`\`\`
${cmd}              Show help
${cmd} -oA          About me
${cmd} -oP          Projects
${cmd} -oH          Help
${cmd} -OW          Open website
${cmd} -H:l         Links
${cmd} --version    Version
\`\`\`

## Requirements

- Python 3.6+
- No external dependencies

## Version

${data.version}

---

*Generated by muavescli Portfolio Maker — made by Muaves (muaves.com)*
`;
}

async function generate() {
  if (!validate(1) || !validate(2)) return;

  const name = val('f-name');
  const username = val('f-username').toLowerCase().replace(/[^a-z0-9_-]/g,'');
  const title = val('f-title');
  const bio = val('f-bio');
  const website = val('f-website');
  const github = val('f-github');
  const email = val('f-email');
  const location = val('f-location');
  const version = val('f-version') || '1.0.0';
  const color = val('f-color') || '36';
  const apiEnabled = document.getElementById('f-show-api').checked;
  const apiUrl = apiEnabled ? val('f-api') : '';
  const zipPrefix = (val('f-zipname') || 'my-portfolio').replace(/\s+/g,'-');
  const os = getOS();

  const projects = collectProjects();
  const links = collectLinks();

  const portfolioData = {
    name,
    username,
    title,
    bio,
    website,
    github,
    email,
    location,
    version,
    projects: projects.map(p => ({ name: p.name, desc: p.desc, url: p.url, tech: p.tech })),
    links: links.map(l => ({ label: l.label, url: l.url })),
    about: { name, title, bio, website, github, email, location },
    credit: "Made with muavescli by Muaves — muaves.com"
  };

  const data = { username, version, apiUrl, name };
  const py = buildPythonScript(data, color);
  const pd = buildPortfolioData(portfolioData);
  const readme = buildReadme({ name, username, version }, os);
  const zipName = `${zipPrefix}-v${version}-by-muaves.zip`;

  const zip = new JSZip();
  const root = zip.folder(`${zipPrefix}-by-muaves`);

  root.file('portfolio_data.json', pd);
  root.file('README.md', readme);

  if (os === 'linux' || os === 'both') {
    const lf = root.folder('linux');
    lf.file('portfolio.py', py);
    lf.file('portfolio_data.json', pd);
    lf.file(username, buildLinuxLauncher(username));
    lf.file('install.sh', buildLinuxInstaller(username));
  }

  if (os === 'windows' || os === 'both') {
    const wf = root.folder('windows');
    wf.file('portfolio.py', py);
    wf.file('portfolio_data.json', pd);
    wf.file(username + '.bat', buildWindowsBat(username));
    wf.file('install.bat', buildWindowsInstaller(username));
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  let instructions = '';
  if (os === 'linux' || os === 'both') {
    instructions += `Linux / macOS:\n  cd ${zipPrefix}-by-muaves/linux\n  chmod +x ${username} install.sh\n  ./${username}\n  # or install globally:\n  ./install.sh\n\n`;
  }
  if (os === 'windows' || os === 'both') {
    instructions += `Windows:\n  cd ${zipPrefix}-by-muaves\\windows\n  ${username}.bat\n  # or install globally:\n  install.bat\n`;
  }

  document.getElementById('done-msg').textContent =
    `${zipName} downloaded! Extract it and follow the steps below. Made with muavescli by Muaves (muaves.com).`;
  document.getElementById('done-instructions').textContent = instructions;
  goTo('done');
}

addProject();
addLink();