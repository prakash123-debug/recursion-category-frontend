
import React from 'react';

function Node({node,children}) {
  console.log("all node are",node);
  let childnodes = null;

  if(children) {
    childnodes = children.map(function(childnode) {
     return (
       <Node node={childnode} children={childnode.children} />
     );
   });
  }

  return (
    <div className="col-md-12" key={node.id}>
      <h5>{node.name}</h5>
      <p>({node.image})</p>
      <hr/>
      { childnodes ?
        <ul >{childnodes}</ul>
      : null }
    </div>
  );
}

export default Node;
