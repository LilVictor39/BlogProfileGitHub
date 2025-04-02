import { dateFormatter } from "../../../../utils/formatter";
import { IssuesContainer, StyledNavLink } from "./styles";

interface IssuesProps {
  number: number;
  title: string;
  body: string;
  created_at: string;
}

export function Issues({ number, title, body, created_at }: IssuesProps) {
  return (
    <IssuesContainer>
      <StyledNavLink to={`/post/${number}`}>
        <div>
          <h2>{title}</h2>
          <span>{dateFormatter.format(new Date(created_at))}</span>
        </div>
        <p>{body?.length > 200 ? `${body?.slice(0, 200)}...` : body}</p>
      </StyledNavLink>
    </IssuesContainer>
  );
}