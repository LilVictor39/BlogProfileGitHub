import { useEffect, useState } from "react";
import { api } from "../../../../ilb/api";
import { SummaryAnchors, SummaryContainer, SummaryHeader } from "./styles";
import { ArrowUpRight, Buildings, GithubLogo, Users } from "phosphor-react";

api.get
interface UserProps {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  location: string;
  followers: number;
}

export function Summary() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    api.get<UserProps>('/users/LilVictor39')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar os dados do GitHub:", error);
        setLoading(false);
      });
  }, []);

  if (loading || !user) {
    return (
      <SummaryContainer>
        <p>Aguarde, carregando os dados do GitHub...</p>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <img src={user.avatar_url} alt={user.name} />
      <section>
        <SummaryHeader>
          <h1>{user.name}</h1>
          <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
            GITHUB
            <ArrowUpRight size={12} />
          </a>
        </SummaryHeader>
        <p>{user.bio}</p>
        <SummaryAnchors>
          <div>
            <GithubLogo size={18} />
            <span>{user.login}</span>
          </div>
          <div>
            <Buildings size={18} />
            <span>{user.location}</span>
          </div>
          <div>
            <Users size={18} />
            <span>{user.followers}</span>
          </div>
        </SummaryAnchors>
      </section>
    </SummaryContainer>
  );
}
