import { fetchJson } from "../utils.js";

function showSkeleton(visible) {
  const skeletonContainer = document.getElementById("skeleton-services");
  visible
    ? (skeletonContainer.style.display = "block")
    : (skeletonContainer.style.display = "none");
}

function showError(visible, error = "") {
  const errorContainer = document.getElementById("error-services");
  const errorText = document.getElementById("error-text");

  if (visible) {
    errorContainer.style.display = "block";
    errorText.textContent = error;
  } else {
    errorContainer.style.display = "none";
    errorText.textContent = error;
  }
}

export async function fetchTeam() {
  try {
    showSkeleton(true);
    showError(false);
    const team = await fetchJson("https://jsonplaceholder.typicode.com/users");
    const engTeamMembers = team.slice(0, 5);
    const markTeamMembers = team.slice(5, 10);

    console.log("engTeam: ", engTeamMembers);
    console.log("mngTeam: ", markTeamMembers);

    const engTeam = document.getElementById("eng-team-section");
    const markTeam = document.getElementById("mark-team-section");

    showSkeleton(false);
    engTeamMembers.forEach((member) => {
      console.log(member);

      const figure = document.createElement("figure");
      figure.innerHTML = `<img src="https://picsum.photos/200"/>
                          <figcaption>
                            <h3>${member.name}</h3>
                            <p>username: ${member.username}</p>
                            <p>email: ${member.email}</p>
                        </figcaption>
                        <div class="margin visible">
                            <i class="fa-solid fa-globe icon"></i>
                            <i class="fa-brands fa-instagram icon"></i>
                            <i class="fa-brands fa-youtube icon"></i>
                        </div>`;
      engTeam.appendChild(figure);
    });

    markTeamMembers.forEach((member) => {
      console.log(member);

      const figure = document.createElement("figure");

      figure.innerHTML = `<img src="https://picsum.photos/200"/>
                          <figcaption>
                            <h3>${member.name}</h3>
                            <p>username: ${member.username}</p>
                            <p>email: ${member.email}</p>
                        </figcaption>
                        <div class="margin visible">
                            <i class="fa-solid fa-globe icon"></i>
                            <i class="fa-brands fa-instagram icon"></i>
                            <i class="fa-brands fa-youtube icon"></i>
                        </div>`;
      markTeam.appendChild(figure);
    });
  } catch (err) {
    console.log("error while fetching team data,", err);

    showSkeleton(false);
    showError(true, "errow while fetching team data");
  } finally {
    showSkeleton(false);
  }
}
