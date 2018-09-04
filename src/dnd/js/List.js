import React, { Component } from 'react';
import Item from './Item';
import styles from '../css/index.less';


class List extends Component {
  render() {
    const {
      data,
      moveItem,
      listId,
    } = this.props;

    return (
      <div className={styles.list}>
        {data.map((item, i) => (
          <Item
            moveItem={moveItem}
            key={item.id}
            index={i}
            data={item}
            listId={listId}
          />
        ))}
      </div>
    )
  }
}

export default List;