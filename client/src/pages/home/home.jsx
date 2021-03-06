import React, { useState } from "react";
import Cards from "../../components/cards";
import Nav from "../../components/nav";
import Search from "../../components/search";
import { useEffect } from "react";
import { useHistory } from "react-router";
import {
  clearId,
  getNameDog,
  setLoading,
  backPages,
  nextPage,
  getTemperament,
  searchStatus,
  selectData,
  filterTemperament,
  resetPage,
} from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import style from "./style.module.css";
import Loading from "../../components/Loading/loading";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const filterTemp = useSelector((state) => state.filterTemp);
  let posts = useSelector((state) => state.nameDog);
  const page = useSelector((state) => state.pages);
  const data = useSelector((state) => state.data);
  const order = useSelector((state) => state.order);
  const statusSeach = useSelector((state) => state.searchStatus);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let name = query.get("name");

  if (!name) {
    name = "";
  }
  if (posts) {
    posts.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getNameDog(name));
    dispatch(getTemperament());
    dispatch(filterTemperament("All"))
    dispatch(clearId());
    setCurrentPage(page);
  }, [dispatch, name, page]);

  


  if (data === "mydogs") {
    posts = posts.filter((e) => typeof e.id === "string");
  } else if (data === "otherDogs") {
    posts = posts.filter((e) => typeof e.id === "number");
  }
    


  
  if (posts.name && posts.weight) {
  }
  switch (order) {
    case "AZ":
      posts.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      break;
    case "ZA":
      posts.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      break;
    case "Low":
      posts.sort(function (a, b) {
        if (a.weight.slice(0, 3) > b.weight.slice(0, 3)) {
          return 1;
        }
        if (a.weight.slice(0, 3) < b.weight.slice(0, 3)) {
          return -1;
        }
        return 0;
      });
      break;
    case "High":
      posts.sort(function (a, b) {
        if (a.weight.slice(-2) < b.weight.slice(-2)) {
          return 1;
        }
        if (a.weight.slice(-2) > b.weight.slice(-2)) {
          return -1;
        }
        return 0;
      });
      break;

    case "order":
      return posts;

    default:
      break;
  }

  

  if (posts && filterTemp !== undefined){
    
    // eslint-disable-next-line array-callback-return
    posts = posts.filter((e) => {
      if (filterTemp === "All") {
        return posts;
      } else if (e.temperament !== undefined) {
        return e.temperament.split(",").join("").match(filterTemp);
      }
    });
  }
    
    
    

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  let maxPages = Math.ceil(posts.length / postsPerPage);

  function handleBack(e) {
    if (currentPage > 1) {
      e.preventDefault(e);
      dispatch(backPages(currentPage));
      window.scrollTo(0, 0);
      return paginate(page);
    }
  }

  function handleNext(e) {
    if (currentPage < maxPages) {
      e.preventDefault();
      window.scrollTo(0, 0);
      dispatch(nextPage(currentPage, maxPages));
      return paginate(page);
    }
  }
  function handleAcep(e) {
    e.preventDefault();
    dispatch(searchStatus(false));
    dispatch(resetPage());
    dispatch(filterTemperament("All"));
    dispatch(selectData("alldogs"));
    history.push("/home");

    dispatch(getNameDog);
  }

  return (
    <div className={style.background}>
      <Nav />
      <Search />
      {posts.length > 0 ? (
        <div className={style.back}>
          <Cards posts={currentPosts} />
          <div className={style.paginate}>
            <div className={style.btn}>
              <button className={style.arrow} onClick={(e) => handleBack(e)}>
                {"<"}
              </button>
              <h3 className={style.num}>{currentPage}</h3>
              <button className={style.arrow} onClick={(e) => handleNext(e)}>
                {">"}
              </button>
              {posts.length > 8 && (
                <h3 className={style.numberPag}> to {maxPages}</h3>
              )}
            </div>
          </div>
        </div>
      ) : statusSeach ? (
        <div className={style.notFoundBack}>
          <h1 className={style.notFound}>
            {" "}
            no such breed could be found
            <button
              className={style.notFoundBtn}
              onClick={(e) => handleAcep(e)}
            >
              OK
            </button>{" "}
          </h1>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
