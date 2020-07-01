import { Set } from 'immutable';
import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { setMainCharFilters, setStageFilters, setStandaloneTagFilters, setVsCharFilters } from './action_creators';
import { Bit } from './types';

type Props = {
  bit: Bit
  setMainCharFilters: typeof setMainCharFilters
  setVsCharFilters: typeof setVsCharFilters
  setStageFilters: typeof setStageFilters
  setStandaloneTagFilters: typeof setStandaloneTagFilters
}

export default function BitTagPills(props: Props) {
  const {
    bit,
    setMainCharFilters,
    setVsCharFilters,
    setStageFilters,
    setStandaloneTagFilters,
  } = props;
  return (
    <div className="bit-tag-pills">
      {bit.mainChars.map(tag => (
        <Badge
          variant="success"
          className="filter-pill"
          onClick={() => setMainCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.vsChars.map(tag => (
        <Badge
          variant="danger"
          className="filter-pill"
          onClick={() => setVsCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.stages.map(tag => (
        <Badge
          variant="primary"
          className="filter-pill"
          onClick={() => setStageFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.standaloneTags.map(tag => (
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
