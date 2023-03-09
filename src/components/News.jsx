import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import NewsCard from "./NewsCard";

function News() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let componentMounted = true;
    const getNews = async () => {
      setLoading(true);
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://ace.qtstage.io/api/v1/collections/entertainment"
      );
      if (componentMounted) {
        const data = await response.json();
        console.log(data.items);
        setData(data.items);
        setFilter(data.items);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getNews();
  }, []);

  const Loading = () => {
    return (
      <>
        <br />
        <br />
        <br />

        <div className="col-md-9 py-md-3">
          <div className="searchInput_Container"></div>
          <br />
          <br />
          <div className="row">
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-4 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const filterNewsName = (searchTerm) => {
    console.log(searchTerm);
    const updateList = data.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.story.headline.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    });
    setFilter(updateList);
    console.log(updateList);
  };

  const ShowNews = () => {
    return (
      <>
        <br />
        <br />
        <br />

        <div className="col-md-15 py-md-3">
          <div className="row">
            {filter.map((news, index) => {
              return (
                <>
                  <NewsCard
                    key={index}
                    index={index}
                    id={news.id}
                    title={news.story.headline}
                    time={news.story["updated-at"]}
                    author={news.story["author-name"]}
                  />
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <div
        className="position-absolute "
        style={{ backgroundColor: "black", width: "220px" }}
      >
        <img
          style={{ height: "40px", width: "200px", objectFit: "contain" }}
          src="https://fea.assettype.com/newslaundry/assets/NL-new-logo-ccd1a854d8c1bbd27864.svg"
        ></img>
      </div>
      <br />
      <br />
      <input
        type="text"
        className="form-control align-items-centre sticky-top"
        placeholder="Search headlines"
        style={{ width: "100%", borderRadius: "30px", border: "2px solid" }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          filterNewsName(e.target.value);
        }}
        onClick={() => {}}
      />
      <div className="row">{loading ? <Loading /> : <ShowNews />}</div>
    </div>
  );
}

export default News;
