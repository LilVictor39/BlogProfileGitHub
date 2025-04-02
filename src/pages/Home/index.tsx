import { useEffect, useState } from "react";
import { Issues } from "./components/Issues";
import { Summary } from "./components/Summary";
import { HomeContainer, IssuesAside } from "./styles";
import { api } from "../../ilb/api";

export interface PostsProps {
  user: string;
  length: number;
  number: number;
  title: string;
  body: string;
  created_at: string;
  html_url: string;
  comments: number;
}

interface SearchPostsProps {
  items: PostsProps[];
}

export function Home() {
  const [posts, setPosts] = useState<PostsProps[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get<SearchPostsProps>(
        "search/issues?q=repo:lucaspedronet/TudoLista"
      );

      setPosts(response.data.items);
    } catch (error) {
      console.log("Deu ruim...", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <HomeContainer>
      <Summary />

      <IssuesAside>
        {posts.map((post) => (
          <Issues
            key={post.number}
            title={post.title}
            body={post.body}
            created_at={post.created_at}
            number={post.number}
          />
        ))}
      </IssuesAside>
    </HomeContainer>
  );
}