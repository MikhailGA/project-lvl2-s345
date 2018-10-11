import Node from './Node';

export default class Group extends Node {
  constructor(name, type, children) {
    super(name, type);
    this.children = children;
  }
}
