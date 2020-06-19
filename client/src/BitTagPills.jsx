import { List, Set } from 'immutable';
import React from 'react';
import { Label } from 'react-bootstrap';

export default function BitTagPills(props) {
  const {
    bit,
    setMainCharFilters,
    setVsCharFilters,
    setStageFilters,
    setStandaloneTagFilters,
  } = props;
  return (
    <div className="bit-tag-pills">
      {bit.get('mainChars', List()).map(tag => (
        <Label
          bsStyle="success"
          className="filter-pill"
          onClick={() => setMainCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Label>
      ))}
      {bit.get('vsChars', List()).map(tag => (
        <Label
          bsStyle="danger"
          className="filter-pill"
          onClick={() => setVsCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Label>
      ))}
      {bit.get('stages', List()).map(tag => (
        <Label
          bsStyle="primary"
          className="filter-pill"
          onClick={() => setStageFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Label>
      ))}
      {bit.get('standaloneTags', List()).map(tag => (
        <Label
          bsStyle="warning"
          className="filter-pill"
          onClick={() => setStandaloneTagFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Label>
      ))}
    </div>
  );
}
