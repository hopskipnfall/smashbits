// import * as React from 'react';
// import { Badge, Dropdown } from 'react-bootstrap';

// type Props = {
//   title: any
//   bootstrapStyle: any
//   allFilters: any
//   currentFilters: any
//   onClick: (filter: string) => any
// };

// export default function render(props: Props) {
//   const {
//     title, bootstrapStyle, allFilters, currentFilters, onClick,
//   } = props;
//   return (
//     <div className="panel-body">
//       <Dropdown className="dropdown">
//         <Dropdown.Toggle variant={bootstrapStyle} id="dropdown-basic">
//           {title}
//         </Dropdown.Toggle>

//         <Dropdown.Menu className="dropdown-menu">
//           {allFilters.map((filter: string) => (
//             <Dropdown.Item onSelect={() => onClick(filter)} key={filter}>
//               {(currentFilters.includes(filter) ? '\u2713 ' : ' ') + filter}
//             </Dropdown.Item>
//           ))}
//         </Dropdown.Menu>
//       </Dropdown>

//       <div>
//         {currentFilters.map((filter: string) => (
//           <Badge variant={bootstrapStyle} className="filter-pill" onClick={() => onClick(filter)} key={filter}>
//             &#215;
//             {' '}
//             {filter}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   );
// }
