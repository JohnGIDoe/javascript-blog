'use strict'

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
        optTitleListSelector = '.titles',
        titleList = document.querySelector(optTitleListSelector);

  /* [DONE] Clear content of titlelist */
  titleList.innerHTML = "";
  
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
  /* [DONE] Find id of every article */
    const articleId = article.getAttribute('id');

  /* [DONE] Find title of every article */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  /* [DONE] Create html for single link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

  /* Add created code to the titlelist */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

}

generateTitleList();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}