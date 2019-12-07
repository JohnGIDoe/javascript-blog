'use strict';

const options = {
  optArticleSelector: '.post',
  optTitleSelector: '.post-title',
  optTitleListSelector: '.titles',
  optArticleTagsSelector:'.post-tags .list',
  optTagsListSelector: '.tags.list',
  optCloudClassCount: 5,
  optCloudClassPrefix: 'tag-size-',
  optArticleAuthorSelector: '.post-author'
};

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

function generateTitleLinks(customSelector = '') {

  let html = '';

  /* [DONE] Clear content of titlelist */
  const titleList = document.querySelector(options.optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] Find all articles and save them to variable: articles */
  const articles = document.querySelectorAll(options.optArticleSelector + customSelector);

  /* [DONE] For every article */
  for (let article of articles) {

    /* [DONE] Find id of every article */
    const articleId = article.getAttribute('id');

    /* [DONE] Find title of every article */
    const articleTitle = article.querySelector(options.optTitleSelector).innerHTML;

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

generateTitleLinks();

function generateTags(){
  // create object allTags
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(options.optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(options.optArticleTagsSelector);

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

      // check if this link is not already in allTags
      if (!Object.hasOwnProperty.call(allTags, tag)) {
        // add tag to allTags object
        allTags[tag] = 1;
      } else {
        // if tag is already in allTags object raise its value of one
        allTags[tag]++;
      }

      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('afterbegin', html);

  /* [DONE] END LOOP: for every article: */
  }

  // fins list of tags in right column
  const tagList = document.querySelector(options.optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);

  // create variable for all links HTML code
  let allTagsHMTL = '';

  // Start loop for each tag in allTags
  for (let tag in allTags) {
    // generate code of a link and add it to allTagsHTML
    allTagsHMTL += '<a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) +'">' + tag + ' (' + allTags[tag] + ') ' + '</a>';
  // End loop for each tag in allTags
  }

  // Add HTML from allTagsHTML to tagList
  tagList.innerHTML = allTagsHMTL;
}

function calculateTagsParams(tags) {
  // declare empty array and empty object
  // eslint-disable-next-line no-unused-vars
  let tagsArray = [], calculatedTagsParams = {};
  // Start loop for each tag
  for (let tag in tags) {
    // add number of occurences of every tag to the tags Array
    tagsArray.push(tags[tag]);
  }
  // Find and return maximum and minimum number of all tags occurencies
  return calculatedTagsParams = {
    min: Math.min(...tagsArray),
    max: Math.max(...tagsArray)
  };
}

function calculateTagClass(count, params) {

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const currentTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let currentTag of currentTags) {

    /* add class active */
    currentTag.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tag of tags) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* [DONE] find all authors */
  const articles = document.querySelectorAll(options.optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find authors wrapper */
    const tagsWrapper = article.querySelector(options.optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-authors attribute */
    const author = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */
    let linkHTML = '<a href="#author-' + author + '">' + author + '</a> ';

    /* [DONE] add generated code to html variable */
    html += linkHTML;

    /* [DONE] insert HTML of all the links into the author wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);

  }
  /* [DONE] END LOOP: for every article: */
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author name from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const currentAuthors = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (let currentAuthor of currentAuthors) {

    /* add class active */
    currentAuthor.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  // find all links to authors
  const authors = document.querySelectorAll('.post-author a');

  // START loop for each link
  for (let author of authors) {

    // add authorClickHandler as event listener for that link
    author.addEventListener('click', authorClickHandler);

  // END loop for each link
  }
}

addClickListenersToAuthors();
