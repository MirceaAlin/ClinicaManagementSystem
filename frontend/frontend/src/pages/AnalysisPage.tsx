import React, { useState, useMemo } from "react";
import GlassCard from "../components/GlassCard.tsx";
import OptionTile from "../components/OptionTile.tsx";
import GlassModal from "../components/GlassModal.tsx";
import { mockAnalyses } from "../data/mock.ts";
import "../styles/glass.css";
import { MoreVertical } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AnalysisPage: React.FC = () => {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [analyses, setAnalyses] = useState(mockAnalyses);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilteredModal, setShowFilteredModal] = useState(false);
  const [filterType, setFilterType] = useState<"date" | "type" | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedChartTest, setSelectedChartTest] = useState<string>("Glicemie");

  const [newAnalysis, setNewAnalysis] = useState({
    testName: "",
    result: "",
    unit: "",
    normalRange: "",
    testDate: "",
    patientName: "Mogage Razvan",
  });
  const toggleSortMenu = () => setSortMenuOpen(!sortMenuOpen);
  const sortByDateAsc = () => {
    const sorted = [...analyses].sort(
      (a, b) => new Date(a.testDate).getTime() - new Date(b.testDate).getTime()
    );
    setAnalyses(sorted);
    setSortMenuOpen(false);
  };

  const sortByDateDesc = () => {
    const sorted = [...analyses].sort(
      (a, b) => new Date(b.testDate).getTime() - new Date(a.testDate).getTime()
    );
    setAnalyses(sorted);
    setSortMenuOpen(false);
  };

  const handleCreate = () => {
    if (!newAnalysis.testName || !newAnalysis.result) return;
    setAnalyses([...analyses, { id: analyses.length + 1, ...newAnalysis }]);
    setShowCreateModal(false);
    setNewAnalysis({
      testName: "",
      result: "",
      unit: "",
      normalRange: "",
      testDate: "",
      patientName: "Mogage Razvan",
    });
  };
  // Ștergere analize selectate
  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const handleDelete = () => {
    setAnalyses((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
    setDeleteMode(false);
  };

  const filteredByOption = useMemo(() => {
    if (!filterType) return analyses;
    if (filterType === "date") {
      return [...analyses].sort(
        (a, b) => new Date(b.testDate).getTime() - new Date(a.testDate).getTime()
      );
    }
    if (filterType === "type") {
      return [...analyses].sort((a, b) => a.testName.localeCompare(b.testName));
    }
    return analyses;
  }, [analyses, filterType]);


  const categories = useMemo(() => {
    const uniqueTests = Array.from(new Set(analyses.map((a) => a.testName)));
    return uniqueTests;
  }, [analyses]);
  // analizele filtrate pe testul selectat
  const filteredByCategory = useMemo(() => {
    return analyses.filter((a) => a.testName === selectedCategory);
  }, [analyses, selectedCategory]);

  const chartData = useMemo(() => {
    return analyses
      .filter((a) => a.testName === selectedChartTest)
      .map((a) => ({
        date: a.testDate,
        value: parseFloat(a.result),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [analyses, selectedChartTest]);

  return (
    <div className="analyses-page">
      {" "}

      <div className="analyses-sidebar">

        <div className="options-row">
          <OptionTile
            label="Vizualizare analize pacient"
            onClick={() => setShowViewModal(true)}
          />
          <OptionTile
            label="Creează analiză"
            onClick={() => setShowCreateModal(true)}
          />

        </div>


        <div className="patient-header">
          <img
            src="/images/mogagerazvan.jpeg"
            alt="Patient"
            className="patient-photo"
          />
          <div>
            <p className="label">Nume pacient:</p>
            <h1 className="patient-name">Mogage Razvan</h1>
          </div>
        </div>
      </div>

      <div className="analyses-main-content">

        <div className="analyses-sections">
          <GlassCard title="Analize recente">
            <div className="card-toolbar">
              <button className="menu-btn" onClick={toggleSortMenu}>
                <MoreVertical size={20} />
              </button>
              {sortMenuOpen && (
                <div className="sort-menu">
                  <p onClick={sortByDateAsc}>Afișează după data crescător</p>
                  <p onClick={sortByDateDesc}>Afișează după data descrescător</p>
                </div>
              )}
            </div>
            <table className="analysis-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Rezultat</th>
                  <th>Interval normal</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {analyses.slice(0, 3).map((a) => (
                  <tr key={a.id}>
                    <td>{a.testName}</td>
                    <td>
                      {a.result} {a.unit}
                    </td>
                    <td>{a.normalRange}</td>
                    <td>{a.testDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>


          <GlassCard title="Analize pe categorii">
            {categories.length === 0 ? (
              <p className="placeholder">Nu există analize disponibile.</p>
            ) : (
              <div className="category-list">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="category-tile"

                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryModal(true);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </GlassCard>


          <GlassCard title="Evoluția analizelor">
            <div className="chart-toolbar">
              <select
                className="glass-select"
                value={selectedChartTest}
                onChange={(e) => setSelectedChartTest(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {chartData.length > 0 ? (
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.2)"
                    />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.8)" />
                    <YAxis stroke="rgba(255,255,255,0.8)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "none",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00ffff"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="placeholder">
                Nu există date pentru analiza selectată.
              </p>
            )}
          </GlassCard>
        </div>{" "}

      </div>{" "}

      {showCreateModal && (
        <GlassModal
          title="Creează o analiză"
          onClose={() => setShowCreateModal(false)}
        >
          <form
            className="form-grid"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <input
              type="text"
              placeholder="Nume test"
              value={newAnalysis.testName}
              onChange={(e) =>
                setNewAnalysis({ ...newAnalysis, testName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Rezultat"
              value={newAnalysis.result}
              onChange={(e) =>
                setNewAnalysis({ ...newAnalysis, result: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Unitate (ex: mg/dL)"
              value={newAnalysis.unit}
              onChange={(e) =>
                setNewAnalysis({ ...newAnalysis, unit: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Interval normal"
              value={newAnalysis.normalRange}
              onChange={(e) =>
                setNewAnalysis({
                  ...newAnalysis,
                  normalRange: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={newAnalysis.testDate}
              onChange={(e) =>
                setNewAnalysis({ ...newAnalysis, testDate: e.target.value })
              }
            />
            <button type="submit" className="submit-btn">
              Adaugă analiză
            </button>
          </form>
        </GlassModal>
      )}
      {showViewModal && (
        <GlassModal
          title="Toate analizele"
          onClose={() => {
            setShowViewModal(false);
            setDeleteMode(false);
            setSelectedIds([]);
          }}
          menu={
            <button
              className="menu-btn"
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            >
              <MoreVertical size={20} />
            </button>
          }
        >
          {showOptionsMenu && (
            <div className="sort-menu">
              <p
                onClick={() => {
                  setDeleteMode(true);
                  setShowOptionsMenu(false);
                }}
              >
                Ștergere
              </p>
              <p
                onClick={() => {
                  setShowFilteredModal(true);
                  setShowOptionsMenu(false);
                }}
              >
                Vizualizare
              </p>
            </div>
          )}
          {deleteMode && (
            <div className="delete-toolbar">
              <button
                className="cancel-btn"
                onClick={() => {
                  setDeleteMode(false);
                  setSelectedIds([]);
                }}
              >
                Cancel
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          <table className="analysis-table">
            <thead>
              <tr>
                {deleteMode && <th></th>}
                <th>Test</th>
                <th>Rezultat</th>
                <th>Interval normal</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((a) => (
                <tr key={a.id}>
                  {deleteMode && (
                    <td>
                      <div
                        className={`circle-select ${selectedIds.includes(a.id) ? "selected" : ""
                          }`}
                        onClick={() => toggleSelection(a.id)}
                      ></div>
                    </td>
                  )}
                  <td>{a.testName}</td>
                  <td>
                    {a.result} {a.unit}
                  </td>
                  <td>{a.normalRange}</td>
                  <td>{a.testDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassModal>
      )}
      {showFilteredModal && (
        <GlassModal
          title="Vizualizare analize"
          onClose={() => {
            setShowFilteredModal(false);
            setFilterType(null);
          }}
        >
          {!filterType ? (
            <div className="filter-options">
              <button
                className="filter-btn"
                onClick={() => setFilterType("date")}
              >
                După dată
              </button>
              <button
                className="filter-btn"
                onClick={() => setFilterType("type")}
              >
                După tip
              </button>
            </div>
          ) : (
            <table className="analysis-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Rezultat</th>
                  <th>Interval</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredByOption.map((a) => (
                  <tr key={a.id}>
                    <td>{a.testName}</td>
                    <td>
                      {a.result} {a.unit}
                    </td>
                    <td>{a.normalRange}</td>
                    <td>{a.testDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </GlassModal>
      )}
      {showCategoryModal && selectedCategory && (
        <GlassModal
          title={`Analize pentru: ${selectedCategory}`}
          onClose={() => {
            setSelectedCategory(null);
            setShowCategoryModal(false);
          }}
        >
          {filteredByCategory.length === 0 ? (
            <p>Nu există analize pentru acest test.</p>
          ) : (
            <table className="analysis-table">
              <thead>
                <tr>
                  <th>Rezultat</th>
                  <th>Unitate</th>
                  <th>Interval normal</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredByCategory.map((a) => (
                  <tr key={a.id}>
                    <td>{a.result}</td>
                    <td>{a.unit}</td>
                    <td>{a.normalRange}</td>
                    <td>{a.testDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </GlassModal>
      )}
    </div>
  );
};
export default AnalysisPage;