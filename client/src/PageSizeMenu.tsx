// import * as React from 'react';
// import { connect } from 'react-redux';
// import { DropdownButton, Dropdown } from 'react-bootstrap';
// import * as actionCreators from './action_creators';

// const SIZES = [10, 25, 50];

// const PageSizeMenu = (props: any) => {
//   const { pageSize, setPageSize } = props;
//   return (
//     <span>
//       Results per page:
//       <DropdownButton variant="info" title={`${pageSize}`} id="page-size-menu">
//         {SIZES.map(size => (
//           <Dropdown.Item onSelect={() => setPageSize(size)} key={size}>
//             {size}
//           </Dropdown.Item>
//         ))}
//       </DropdownButton>
//     </span>
//   );
// };

// const mapStateToProps = (state: Map<string, any>, ownProps: any) => ({
//   pageSize: ownProps.pageSize,
// });

// export default connect(mapStateToProps, actionCreators)(PageSizeMenu);
