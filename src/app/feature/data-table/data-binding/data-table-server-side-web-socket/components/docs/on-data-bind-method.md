  public onDataBind(mapper?: <Q>(source: Observable<Q>) => Observable<DataTableQueryResult<T[]>>): DataTableDataBindCallback {
    if (!this.socket) {
      throw Error('Initialize socket data source before data bind.');
    }

    this.socketSubscription = this.socket.subscribe(this.subject);

    return (params?: DataTableRequestParams): Observable<DataTableQueryResult<T[]>> => {
      if (params) {
        this.socket.next({
          type: 'data-fetch',
          offset: params.offset,
          limit: params.limit,
          fields: params.fields
        } as any);

        if (mapper) {
          return mapper(this.subject);
        }

        return this.subject;
      }
    };
  }
