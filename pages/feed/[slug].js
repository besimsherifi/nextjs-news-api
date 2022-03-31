import React from "react";
import styles from "../../styles/Feed.module.css";
import { useRouter } from "next/router";
import Toolbar from "../../components/toolbar";

function Feed({ pageNumber, articles }) {

    const router = useRouter();

  return (
    <div className="page-container">
        <Toolbar/>
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>

        <div className={styles.paginator}>
            <div onClick={() => {
                if (pageNumber > 1) {
                    router.push(`/feed/${pageNumber - 1}`)
                    }
                }}
                className={pageNumber === 1 ? styles.disabled : styles.active}>Prevoius Page
            </div>
            <div>
                #{pageNumber}
            </div>
            <div onClick={() => {
                if (pageNumber < 5) {
                    router.push(`/feed/${pageNumber + 1}`)
                    }
                }}
                className={pageNumber === 5 ? styles.disabled : styles.active}>Next Page
            </div>
        </div>

    </div>
  );
}

export async function getServerSideProps(context) {
  const pageNumber = context.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );

  const apiJson = await res.json();
  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: +pageNumber,
    },
  };
}

export default Feed;
