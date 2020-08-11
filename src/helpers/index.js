
import { API, ITEMLIMIT, NEXT } from '../constants';

export const getPageNumber = (setNext) => {
   const currentPage = window.location.href.split('/').pop(-1);
   const increment = parseInt(currentPage.toString().charAt(1));
   const currentNext = Math.floor(currentPage / 10)*10;
   const nextPage = increment !== 0 ? currentNext + 10 : currentNext;
   setNext(nextPage);

   return currentPage;
}

export const handleSetPage = (event, pageInfo) => {
   let newPage = event.target.text || null;
   const { maxLimit, setNext, page, next, setPage, history } = pageInfo;
   const navigate = (val,nextPosition) => {
      if (nextPosition === maxLimit) {
         setNext(nextPosition + NEXT)
      }
      if (val < 9) { 
         nextPosition = 20; 
         val = 1;
      }
      if (val > next && nextPosition < maxLimit) {
         setNext(nextPosition + NEXT)
      } else {
         setNext(nextPosition - NEXT)
      }
      return val;
   }

   switch(newPage) {
       case 'first':
           newPage = navigate(1,20);
           break;
       case 'prev':
         newPage = navigate(next-11, next);
           break;
       case 'next':
           newPage = navigate(next+1, next);
           break;
       case 'last':
           newPage = newPage = navigate(maxLimit,maxLimit);
           break;
       case null:
           newPage = 1
           break;
       default:
   }
   if ( maxLimit >= page ) {
       setPage(newPage);
       history.push(`/${newPage}`)
   }
}

export const getProducts = (productInfo) => {
   const axios = require('axios');
   const url = API.BOOKS;
   const { page, itemsPerPage, filters, setData, setResponseSuccess, setMaxLimit } = productInfo;

   axios.post(url, {
       page: page || 1,
       itemsPerPage,
       filters
     })
     .then(function (response) {
       setData(response.data.books);
       setResponseSuccess(true);
       const roundedMaximum = Math.ceil(response.data.count / ITEMLIMIT);
       setMaxLimit(roundedMaximum);
     })
     .catch(function (error) {
       console.log('error = "',error);
     });
}