'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const clickedHref = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const currentArticle = document.querySelector(clickedHref);

  /* [DONE] add class 'active' to the correct article */
  currentArticle.classList.add('active');
}

function generateTitleList() {
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  let html = '';

  /* [DONE] Clear content of titlelist */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] Find all articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] For every article */
  for (let article of articles) {

    /* [DONE] Find id of every article */
    const articleId = article.getAttribute('id');

    /* [DONE] Find title of every article */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] Create html for single link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* Add created code to the titlelist */
    html += linkHTML;
  }
  titleList.insertAdjacentHTML('beforeend', html);

  /* Assign EventListener for every link */
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleList();

function generateTags(){
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleSelector = '.post';

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* [DONE] generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

      /* [DONE] add generated code to html variable */
      html += linkHTML;

      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('afterbegin', html);

  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();
