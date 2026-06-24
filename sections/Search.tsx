"use client";

import { useSignatureSearch } from "@/hooks/useSignatureSearch";
import { Search } from "lucide-react";

export default function SearchSection() {
  const {
    inputValue,
    result,
    error,
    loading,
    setInputValue,
    clearInput,
    search,
  } = useSignatureSearch();

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 lg:px-0">
      <h2 className="mb-6 flex items-center justify-center gap-2 text-3xl font-bold text-[#1B2F3E] lg:mb-10 lg:text-5xl">
        <img
          src="/logo.png"
          alt=""
          className="h-10 w-10 object-cover lg:h-15 lg:w-15"
        />
        Signature Checker
      </h2>

      <div className="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Address or Private Key"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && search()}
          className="flex-1 bg-transparent outline-none"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="cursor-pointer text-red-500 hover:text-red-600"
          >
            ×
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="my-8 flex items-center justify-center">
          <p className="font-medium text-gray-600">Fetching signatures...</p>
        </div>
      )}

      {result && (
        <div className="mt-8">
          <p className="mb-6 flex flex-wrap items-center gap-1 text-sm font-semibold text-gray-800">
            Search Results for:
            <span className="block max-w-[250px] truncate font-mono">
              {result.txHash}
            </span>
          </p>
          <div className="mt-4 overflow-x-auto border border-gray-200">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="w-[200px] px-4 py-2">Transaction Hash</th>
                  <th className="w-[180px] px-4 py-2">Last Updated (UTC)</th>
                  <th className="w-[200px] px-4 py-2">Approved Spender</th>
                  <th className="w-[150px] text-nowrap px-4 py-2">
                    Original Allowance
                  </th>
                  <th className="w-[150px] px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="max-w-[200px] truncate px-4 py-2 font-mono">
                    {result.txHash}
                  </td>
                  <td className="truncate px-4 py-2">{result.lastUpdated}</td>
                  <td className="max-w-[200px] truncate px-4 py-2 font-medium text-red-600">
                    {result.spender}
                  </td>
                  <td className="truncate px-4 py-2">{result.allowance}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="group relative inline-block">
                      <button className="cursor-pointer text-nowrap rounded-lg bg-gray-500 px-3 py-1 text-white group-hover:bg-gray-400">
                        Clear Signature
                      </button>
                      <div className="absolute bottom-4 left-2 hidden whitespace-nowrap rounded-full bg-gray-500 px-3 py-1 text-xs text-white shadow-lg group-hover:block">
                        Search owner&apos;s key.
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
