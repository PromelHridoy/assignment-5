const cardContainer = document.getElementById("card-container");
const total = document.getElementById("total");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const loadingSpinner = document.getElementById("loading-spinner");
const openContainer = document.getElementById("open-container");
const closedContainer = document.getElementById("closed-container");
const issueModal = document.getElementById("issue-modal");
// console.log(issueModal);
const modalTitle = document.getElementById("modal-title");
const modalAuthor = document.getElementById("modal-author");
const modalDescription = document.getElementById("modal-description");
const modalLabels= document.getElementById("modal-labels");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");
const modalCreateDate = document.getElementById("modal-createDate");

// console.log(total.textContent)
// console.log(cardContainer.children.length);


function toggleStyles(id) {
  const buttons = ['all-btn', 'open-btn', 'closed-btn'];
//   const filterContainer = document.getElementById("filter-container");

  buttons.forEach(btnId => {
    const btn = document.getElementById(btnId);

    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });

  const activeBtn = document.getElementById(id);
  activeBtn.classList.remove('btn-outline');
  activeBtn.classList.add('btn-primary');

  if (id === "open-btn") {
  openContainer.classList.remove("hidden");
  closedContainer.classList.add("hidden");
  cardContainer.classList.add("hidden");
}
else if (id === "closed-btn") {
  openContainer.classList.add("hidden");
  closedContainer.classList.remove("hidden");
  cardContainer.classList.add("hidden");
}
else {
  cardContainer.classList.remove("hidden");
  openContainer.classList.add("hidden");
  closedContainer.classList.add("hidden");
}

updateTotal(id);
}



async function loadIssues() {
    
    showLoading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    // console.log(res);
    const data = await res.json()
   displayIssues(data.data);
   const filter = data.data.filter(i => i.status === 'open');
    // console.log(filter);
      displayOpenIssues(filter);
     const filter2 =data.data.filter(i => i.status === 'closed');
    // console.log(filter2);
    displayClosedIssues(filter2);

   total.textContent = cardContainer.children.length;
// updateTotal(id);

hideLoading();
}

function updateTotal(id) {
  if (id === "all-btn") {
    total.textContent = cardContainer.children.length;
  } else if (id === "open-btn") {
    total.textContent = openContainer.children.length;
  } else if (id === "closed-btn") {
    total.textContent = closedContainer.children.length;
  }
}


async function openIssueModal(issueId) {
    // console.log(issueId);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await res.json()
    const issueDetails = data.data;
    modalTitle.textContent = issueDetails.title;
    modalAuthor.textContent =issueDetails.author;
    modalDescription.textContent=issueDetails.description;
    modalAssignee.textContent =issueDetails.assignee;
    modalPriority.textContent =issueDetails.priority;
    modalCreateDate.textContent = issueDetails.createdAt;
    modalLabels.innerHTML = renderLabels(issueDetails.labels);

    issueModal.showModal();


    
}

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    cardContainer.innerHTML ='';
    openContainer.innerHTML = '';
    closedContainer.innerHTML = '';
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

function renderLabels(labels) {

    const labelHTMLArray = labels.map(label => {
        return `<div class="badge badge-warning badge-soft badge-outline">${label}</div>`;
    });

    return labelHTMLArray.join(" ");
}

function getStatusImage(status) {
    if (status === 'open') {
        return './assets/open-status.png';
    }else if(status === 'closed') {
        return './assets/Closed- Status .png';
    };
}

function getStatusBorder(status) {
    if (status.toLowerCase() === 'open') {
        return 'border-green-500';  
    } else if (status.toLowerCase() === 'closed') {
        return 'border-purple-500';   
    }      
}

function getPriorityBadge(priority) {
    priority = priority.toUpperCase().trim();
    if(priority === "HIGH") return `<div class="badge badge-error badge-soft">${priority}</div>`;
    else if(priority === "MEDIUM") return `<div class="badge badge-warning badge-soft">${priority}</div>`; 
    else if(priority === "LOW") return `<div class="badge badge-Neutral badge-soft">${priority}</div>`; 
    
}

function displayOpenIssues(issues) {
    // console.log(issues);
    

    issues.forEach(issue => {

        const div = document.createElement("div");

        const priorityBadge = getPriorityBadge(issue.priority);

        div.className = `card bg-base-100 border-t-4 ${getStatusBorder(issue.status)} shadow`;

        div.innerHTML = `
        <div onclick="openIssueModal(${issue.id})" class="card-body p-4">

          <div class="flex justify-between">
            <img src="${getStatusImage(issue.status)}" alt="">
           ${priorityBadge}
          </div>

          <h3 class="font-semibold mt-2">
            ${issue.title}
          </h3>

          <p class="text-sm text-gray-500">
            ${issue.description}
          </p>

          <div class="flex gap-2 mt-2">
            ${renderLabels(issue.labels)}
          </div>

        </div>

        <div onclick="openIssueModal(${issue.id})" class="border-t border-gray-200 p-3 text-xs text-gray-500 space-y-2">
          <p>#${issue.id} by ${issue.author}</p>
          <p>${issue.createdAt}</p>
        </div>
        `;

        openContainer.appendChild(div);

    });

}

function displayClosedIssues(issues) {
    // console.log(issues);
    

    issues.forEach(issue => {

        const div = document.createElement("div");

        const priorityBadge = getPriorityBadge(issue.priority);

        div.className = `card bg-base-100 border-t-4 ${getStatusBorder(issue.status)} shadow`;

        div.innerHTML = `
        <div onclick="openIssueModal(${issue.id})" class="card-body p-4">

          <div class="flex justify-between">
            <img src="${getStatusImage(issue.status)}" alt="">
           ${priorityBadge}
          </div>

          <h3 class="font-semibold mt-2">
            ${issue.title}
          </h3>

          <p class="text-sm text-gray-500">
            ${issue.description}
          </p>

          <div class="flex gap-2 mt-2">
            ${renderLabels(issue.labels)}
          </div>

        </div>

        <div onclick="openIssueModal(${issue.id})" class="border-t border-gray-200 p-3 text-xs text-gray-500 space-y-2">
          <p>#${issue.id} by ${issue.author}</p>
          <p>${issue.createdAt}</p>
        </div>
        `;

        closedContainer.appendChild(div);

    });

}

function displayIssues(issues) {
    // console.log(issues);
    
    // const filter =issues.filter(i => i.status === 'open');
    // console.log(filter);
    // const filter2 =issues.filter(i => i.status === 'closed');
    // console.log(filter2);

    issues.forEach(issue => {

        const div = document.createElement("div");

        const priorityBadge = getPriorityBadge(issue.priority);

        div.className = `card bg-base-100 border-t-4 ${getStatusBorder(issue.status)} shadow`;

        div.innerHTML = `
        <div onclick="openIssueModal(${issue.id})" class="card-body p-4">

          <div class="flex justify-between">
            <img src="${getStatusImage(issue.status)}" alt="">
           ${priorityBadge}
          </div>

          <h3 class="font-semibold mt-2">
            ${issue.title}
          </h3>

          <p class="text-sm text-gray-500">
            ${issue.description}
          </p>

          <div class="flex gap-2 mt-2">
            ${renderLabels(issue.labels)}
          </div>

        </div>

        <div onclick="openIssueModal(${issue.id})" class="border-t border-gray-200 p-3 text-xs text-gray-500 space-y-2">
          <p>#${issue.id} by ${issue.author}</p>
          <p>${issue.createdAt}</p>
        </div>
        `;

        cardContainer.appendChild(div);

    });

}

loadIssues();

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    showLoading();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        
        const filterWords = allWords.filter(word => 
            word.title.toLowerCase().includes(searchValue)
        );
        displayIssues(filterWords);

        const openFiltered = filterWords.filter(i => i.status === 'open');
        displayOpenIssues(openFiltered);

        const closedFiltered = filterWords.filter(i => i.status === 'closed');
        displayClosedIssues(closedFiltered);

        toggleStyles('all-btn'); 

        input.value = ""; 

        hideLoading();
    })
});
