import React from "react";
import { useObservableState } from 'observable-hooks'
import { from } from 'rxjs'

import { tw } from 'twind'
import { topReposQuery } from "../../db/queries";
import { MDIIcon } from "../mdi_icon";
import { Link } from "wouter";
import { Icon } from "@iconify/react";
import { Table, TD, TR } from "../base/Table";
import { intSort, localCompareSort } from "../../helpers/sort";


const topReposObservable = () => useObservableState(() => from(topReposQuery()), []);

export function TopReposview() {
    const [repos] = topReposObservable();
    return <Table items={repos}
        defaultSort="count"
        id="top-repos"
        headers={{
            "count": {
                "label": "# of Helm releases",
                "sort": intSort("count", true)
            },
            "name": {
                "label": "Repo",
                "sort": localCompareSort("name")
            },
            "stars": {
                "label": "Stars",
                "sort": intSort("stars", true)
            }
        }}
        renderRow={(repo: any) => <TR key={repo.name}>
            <TD className="count">{repo.count}</TD>
            <TD className="name">
                <a href={repo.url}>{repo.name}</a>
                <Link href={`/repo:${repo.name}`} className={tw`cursor-pointer`}>
                    <Icon icon={'mdi:search'} className={tw`inline`} />
                </Link>
            </TD>
            <TD className="stars">{repo.stars}</TD>
        </TR>}
    />
  }
  