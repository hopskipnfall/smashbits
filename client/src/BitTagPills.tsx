import { List, Set } from 'immutable';
import * as React from 'react';
import { Badge } from 'react-bootstrap';

export default function BitTagPills(props: any) {
  const {
    bit,
    setMainCharFilters,
    setVsCharFilters,
    setStageFilters,
    setStandaloneTagFilters,
  } = props;
  return (
    <div className="bit-tag-pills">
      {(bit.get('mainChars', List()) as List<string>).map(tag => (
        <Badge
          variant="success"
          className="filter-pill"
          onClick={() => setMainCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {(bit.get('vsChars', List()) as List<string>).map(tag => (
        <Badge
          variant="danger"
          className="filter-pill"
          onClick={() => setVsCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {(bit.get('stages', List()) as List<string>).map(tag => (
        <Badge
          variant="primary"
          className="filter-pill"
          onClick={() => setStageFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {(bit.get('standaloneTags', List()) as List<string>).map(tag => (
        <Badge
          variant="warning"
          className="filter-pill"
          onClick={() => setStandaloneTagFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
