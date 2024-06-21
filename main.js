const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const postsContainer = document.getElementById('container');

postsContainer.innerHTML = '';
posts.forEach(postInfos => {
    const post = document.createElement('div');
    let PostProfilePicString;

    if(postInfos.author.image !== null) {
        PostProfilePicString = `<img class="profile-pic" src="${postInfos.author.image}" alt="${postInfos.author.name}">`;
    } else {
        completeNameParts = postInfos.author.name.split(' ');

        PostProfilePicString =
            `<div class="profile-pic-default">
                <span>${completeNameParts[0].charAt(0)}&ThinSpace;${completeNameParts[completeNameParts.length - 1].charAt(0)}</span>
            </div>`
        ;
    }

    const creationDate = new Date(postInfos.created);
    const creationString = document.documentElement.lang === 'it' ? `${creationDate.getDate()}&VeryThinSpace;/&VeryThinSpace;${creationDate.getMonth() + 1}&VeryThinSpace;/&VeryThinSpace;${creationDate.getFullYear()}` : `${creationDate.getMonth() + 1}&VeryThinSpace;/&VeryThinSpace;${creationDate.getDate()}&VeryThinSpace;/&VeryThinSpace;${creationDate.getFullYear()}`;

    post.classList.add('post');
    post.innerHTML =
        `<div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${PostProfilePicString}
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${postInfos.author.name}</div>
                    <div class="post-meta__time">${creationString}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${postInfos.content}</div>
        <div class="post__image">
            <img src="${postInfos.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${postInfos.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${postInfos.id}" class="js-likes-counter">${postInfos.likes}</b> persone
                </div>
            </div> 
        </div>`
    ;
    
    postsContainer.append(post);
});

const likeBtns = document.querySelectorAll('.js-like-button');

const PostsLiked = [];

likeBtns.forEach(Btn => {
    Btn.addEventListener('click' , function (e) {
        e.preventDefault()
        
        const id = parseInt(this.dataset.postid);
        const postContainingBtn = posts.find(post => post.id === id);

        if(this.classList.contains('like-button--liked')) {
            PostsLiked.splice(PostsLiked.indexOf(id) , 1);
            --postContainingBtn.likes;
        } else {
            PostsLiked.push(id);
            ++postContainingBtn.likes;
        }
        
        this.classList.toggle('like-button--liked');
        document.getElementById(`like-counter-${id}`).innerHTML = `${postContainingBtn.likes}`;
    });
});