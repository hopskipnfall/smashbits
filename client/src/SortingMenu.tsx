// import * as React from 'react';
// import { DropdownButton, Dropdown } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import * as actionCreators from './action_creators';

// const SortingMenu = (props: any) => {
//   const { sorts, currentSort, changeSort } = props;
//   return (
//     <DropdownButton variant="info" title={`Sorting: ${currentSort}`} id="sorting-menu">
//       {sorts.map((sort: string) => (
//         <Dropdown.Item onSelect={() => changeSort(sort)} key={sort}>
//           {sort}
//         </Dropdown.Item>
//       ))}
//     </DropdownButton>
//   );
// };

// const mapStateToProps = (state: Map<string, any>, ownProps: any) => ({
//   sorts: state.get('sorts'),
//   currentSort: ownProps.sort,
// });

// export default connect(mapStateToProps, actionCreators)(SortingMenu);
