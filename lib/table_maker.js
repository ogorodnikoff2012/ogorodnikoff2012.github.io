function TableMaker(cols, table) {

    this.rowCounter = 0;
    this.colCounter = 0;
    this.curRow = table.insertRow(this.rowCounter);

    this.addButton = function(button) {
        if(this.colCounter >= cols) {
            this.colCounter = 0;
            this.rowCounter++;
            this.curRow = table.insertRow(this.rowCounter);
        }

        var curCell = this.curRow.insertCell(this.colCounter);
        curCell.appendChild(button);

        this.colCounter++;
    }
}
