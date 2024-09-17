// This function used to fetch data form api
const loadAllPosts = async (searchValue) => {
  let url = searchValue
    ? `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`
    : "https://openapi.programming-hero.com/api/retro-forum/posts";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayAllPosts(data.posts);
  } catch (err) {
    console.log(err);
  }
};

//This function takes api data and display it on the user interface
const displayAllPosts = (data) => {
  //Find container div for append the single post
  const postContainer = document.getElementById("post-container");

  //clear the previous api data
  postContainer.textContent = "";

  data.forEach((post) => {
    //desturcturing the necessary property
    const {
      category,
      author: { name },
      title,
      description,
      image,
      isActive,
      posted_time,
      view_count,
      comment_count,
    } = post;

    const createdDiv = document.createElement("div");
    createdDiv.classList = "flex gap-6 bg-[#797DFC1A] p-10 rounded-3xl mb-5";

    createdDiv.innerHTML = `
      <div class="avatar ${isActive ? "online" : "offline"}">
                  <div
                    class="w-[72px] h-[72px] rouned-2xl rounded-2xl border-none"
                  >
                    <img src="${image}" alt="" />
                  </div>
                </div>

                <div class="space-y-3 w-full">
                  <div class="flex gap-2">
                    <p class="text-sm text-[#12132DCC] font-bold">
                      #<span class="text-[#12132DCC] font-bold">${category}</span>
                    </p>
                    <p class="text-sm text-[#12132DCC] font-bold">
                      Author:<span class="text-[#12132DCC] font-bold"
                        >${name}</span
                      >
                    </p>
                  </div>
                  <div
                    class="space-y-4 pb-5 border-b-2 border-dotted border-[#12132D40]"
                  >
                    <p class="text-xl text-[#12132D] font-bold">
                    ${title}
                    </p>
                    <p class="text-lg text-[#12132D]99">
                    ${description}
                    </p>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex gap-12">
                      <p class="flex gap-3">
                        <img src="icons/comment.svg" alt="" /><span>${comment_count}</span>
                      </p>
                      <p class="flex gap-3">
                        <img src="icons/show.svg" alt="" /><span>${view_count}</span>
                      </p>
                      <p class="flex gap-3">
                        <img src="icons/time.svg" alt="" /><span>${posted_time}</span>
                      </p>
                    </div>
                    <button onClick="handleMarkAsRead('${name}','${title}','${view_count}')">
                    <img
                      src="icons/email 1.svg
                "
                      alt=""
                    />
                    </button>
                  </div>
                </div>
      `;
    postContainer.appendChild(createdDiv);
  });
  // Hide the spinner
  removeOrAddClassById("sppiner", "hidden", true);
};

//This function used for handle search realted functionality
const handleSearch = () => {
  //Show load sppiner
  removeOrAddClassById("sppiner", "hidden", false);
  const searchInput = document.getElementById("search-input");
  const searchInputVal = searchInput.value;
  loadAllPosts(searchInputVal);
};

const handleMarkAsRead = (authorNmame, Title, numberofView) => {
  //increse the read count
  const markReadCount = document.getElementById("read-count");
  console.log(markReadCount);
  const markReadCountVal = parseInt(markReadCount.innerText);
  const updateReadCount = markReadCountVal + 1;
  markReadCount.innerText = updateReadCount;

  //Find parent element to append
  const markContainer = document.getElementById("mark-read-box");

  //crate div element and set inner html
  const div = document.createElement("div");
  div.classList = "flex justify-between bg-white rounded-2xl p-3 my-3";
  div.innerHTML = `
                  <div>
                    <p>${Title}</p>
                    <p>${authorNmame}</p>
                  </div>
                  <p class="flex gap-2 items-center">
                    <img src="icons/show.svg" alt="" />
                    <span>${numberofView}</span>
                  </p>
  `;
  //append chiled element
  markContainer.appendChild(div);
};

const loadLeatestPosts = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    displayLeatestPost(data);
  } catch (err) {
    console.log(err);
  }
};

const displayLeatestPost = (data) => {
  const leatestPostContainer = document.getElementById(
    "leatest-post-container"
  );
  data.forEach((post) => {
    console.log(post);

    const div = document.createElement("div");
    div.classList =
      "space-y-4 p-5 border-2 border-[#1213226] w-[374px] rounded-2xl";

    div.innerHTML = `
            <img
              src="${post?.cover_image}"
              alt=""
              class="w-[326px] h-[190px] rounded-2xl"
            />
            <p class="flex gap-2">
              <img src="icons/publish.svg" alt="" />
              <span>${post?.author?.posted_date || "No publish date"}</span>
            </p>
            <h3>
              ${post?.title}
            </h3>
            <p>
              ${post?.description}
            </p>

            <div class="flex gap-5 items-center">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2"
                >
                  <img
                    src="${post?.profile_image}"
                  />
                </div>
              </div>

              <div>
                <p>${post?.author?.name}</p>
                <p>${post?.author?.designation || "Unknown"}</p>
              </div>
            </div>
    `;
    leatestPostContainer.appendChild(div);
  });
};
loadLeatestPosts();
loadAllPosts("");
