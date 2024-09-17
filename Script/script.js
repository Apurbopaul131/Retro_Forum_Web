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
                    <img
                      src="icons/email 1.svg
                "
                      alt=""
                    />
                  </div>
                </div>
      `;
    postContainer.appendChild(createdDiv);
  });
};

//This function used for handle search realted functionality
const handleSearch = () => {
  const searchInput = document.getElementById("search-input");
  const searchInputVal = searchInput.value;
  loadAllPosts(searchInputVal);
};
loadAllPosts("");
