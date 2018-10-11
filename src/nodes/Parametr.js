import Node from './Node';

export default class Parametr extends Node {
  constructor(name, type, value) {
    super(name, type);
    this.value = value;
  }
}
