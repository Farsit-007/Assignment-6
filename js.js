let count = 0;
const fetchCategory = async () => {
const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const card = data.posts;
    
    const postContainer = document.getElementById('posts-container');
    postContainer.innerHTML = '<div class="flex justify-center "><span class="loading loading-spinner loading-md"></span></div>';
    setTimeout(() => {
        displayCategory(card);
    }, 2000);
}

const displayCategory = (card) => {
    const postContainer = document.getElementById('posts-container');
    postContainer.textContent = '';
    card.forEach((card1) => {
        const isActive = card1.isActive;
        const newcard = document.createElement('div');
        newcard.className = 'card lg:card-side bg-base-100 mb-5 border-[1px] bg-[#F3F3F5] border-[#0D0D181A]  lg:pl-6';
        newcard.innerHTML = `
            <div class="pt-8 relative ">
                <img class="flex-1 rounded-md border md:p-0" src="${card1.image}" width="70px" alt="Movie"/>
                <div class="absolute top-7 left-16 md:-right-1  h-5 w-5 rounded-full ${isActive ? 'bg-green-600' : 'bg-red-600'}"></div>
            </div>
            <div class="card-body flex-1 space-y-1 lg:w-[65%]">
                <div class="flex items-center gap-8">
                    <div>
                        <p># ${card1.category}</p>
                    </div>
                    <div>
                        <p>Author : ${card1.author.name}</p>
                    </div>
                </div>
                <h2 class="card-title text-lg md:text-xl font-extrabold">${card1.title}</h2>
                <p class="text-base font-medium">${card1.description}</p>
                <div class="flex justify-between border-t-2 border-dashed pt-4">
                    <div class="flex md:items-center gap-6 ">
                        <div class="flex items-center py-3 gap-2">
                            <img src="images/t1.png" alt="">
                            <p class="">${card1.comment_count}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="images/t2.png" alt="">
                            <p> ${card1.view_count}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="images/t3.png" alt="">
                            <p> ${card1.posted_time} min</p>
                        </div>
                    </div>
                    <div>
                        <button class="btn rounded-full"><img src="images/email 1.png" alt=""></button>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(newcard);

        // Add event listener to each button
        newcard.querySelector('button').addEventListener('click', () => {
            const counter = document.getElementById('count');
            count = count + 1;
            counter.innerText = count;

            clickApped(card1);
        });
    });
}


const displayNoResults = () => {
    const postContainer = document.getElementById('posts-container');
    postContainer.textContent = '';

    const noResultMessage = document.createElement('div');
    noResultMessage.textContent = ' No Results Found';
    postContainer.appendChild(noResultMessage);
}

const handleSearch = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value.trim();
    const postContainer = document.getElementById('posts-container');
    postContainer.innerHTML = '<div class="flex justify-center"><span class="loading loading-spinner loading-md"></span></div>';

    setTimeout(() => {
        if (searchText !== '') {
            fetchCategory2(searchText);
        } else {
            displayNoResults();
        }
    }, 2000);
}


const clickApped = (card1) => {
    const timeLine = document.getElementById('timeline-container');
    const newTimeLine = document.createElement('div');
    newTimeLine.className = 'flex justify-between items-center bg-white p-3 rounded-lg mt-3';
    newTimeLine.innerHTML = `
        <div class="w-[70%]">
            <p>${card1.title}</p>
        </div>
        <div class="flex items-center gap-2">
            <img src="images/t2.png" alt="">
            <p>${card1.view_count}</p>
        </div>
    `;
    timeLine.appendChild(newTimeLine);
}

const fetchCategory2 = async (SearchText) => {
    try{ 
     const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${SearchText}`);
     const data = await res.json();
     const card = data.posts;
     displayCategory(card);
     if (card.length === 0) {
         displayNoResults();
     } else {
         displayCategory(card);
     };
 }
 catch(error){
     console.error(error);
     displayNoResults();
 }
 }
 

const fetchCategory3 = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const card2 = data;
    displayCategory2(card2);
}


const displayCategory2 = (card2) => {
    const latestpostContainer = document.getElementById('latest-post');
    card2.forEach((cards) => {
        const newcard1 = document.createElement('div');
        newcard1.className = 'card card-compact w-96 mx-auto bg-base-100 shadow-xl h-[510px] p-3';
        newcard1.innerHTML = `
        <figure class="mt-3 rounded-md"><img src="${cards.cover_image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <div class="flex gap-2 items-center">
                      <img src="images/ya.png" alt="">
                      <h2>${cards.author.posted_date || "No Publish Date"}</h2>
                      </div>
                       
                        <h2 class="card-title">${cards.title}</h2>
                        <p class="">${cards.description}</p>
                        <div class="flex gap-4">
                            <div >
                                <img class="rounded-full" src="${cards.profile_image}" width="50px" height="50px" alt="">
                            </div>
                            <div>
                                <p class="font-bold">${cards.author.name}</p>
                                <p>${cards.author.designation || 'Unknown'} </p>
                            </div>
                        </div>
                    </div>
        `;
        latestpostContainer.appendChild(newcard1);


    });
}


fetchCategory3();




fetchCategory();
