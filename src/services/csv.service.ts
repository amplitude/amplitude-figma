export interface AcceptableData {
  [key: string]: null | undefined | Date | string | number | boolean;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CsvDataService {
  static exportToCsv(filename: string, rows: AcceptableData[]): void {
    if (rows.length === 0) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvData =
        `${keys.join(separator)
        }\n${
        rows.map(row => {
          return keys.map(k => {
            let cell = row[k];
            cell ??= '';
            cell = cell instanceof Date
              ? cell.toLocaleString()
              : cell.toString().replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          }).join(separator);
        }).join('\n')}`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
